import { RentalOrderStatus, Role } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";

const getRentalDays = (startDate: Date, endDate: Date) => {
  const diffMs = endDate.getTime() - startDate.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  return Math.ceil(diffMs / oneDayMs);
};

export const createRental = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError(401, "Unauthorized request");
  }

  const { gearItemId, startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    throw new AppError(400, "endDate must be greater than startDate");
  }

  const gearItem = await prisma.gearItem.findUnique({
    where: { id: gearItemId },
  });

  if (!gearItem) {
    throw new AppError(404, "Gear item not found");
  }

  if (!gearItem.isAvailable || gearItem.stock <= 0) {
    throw new AppError(400, "Gear item is currently not available");
  }

  const rentalDays = getRentalDays(start, end);
  const unitPrice = Number(gearItem.pricePerDay.toString());
  const totalPrice = rentalDays * unitPrice;

  const rentalOrder = await prisma.$transaction(async (tx) => {
    const order = await tx.rentalOrder.create({
      data: {
        customerId: req.user!.userId,
        gearItemId,
        startDate: start,
        endDate: end,
        totalPrice,
        status: RentalOrderStatus.PLACED,
      },
      include: {
        gearItem: true,
      },
    });

    const remainingStock = gearItem.stock - 1;
    await tx.gearItem.update({
      where: { id: gearItem.id },
      data: {
        stock: remainingStock,
        isAvailable: remainingStock > 0,
      },
    });

    return order;
  });

  res.status(201).json({
    success: true,
    message: "Rental order created successfully",
    data: rentalOrder,
  });
});

export const getRentals = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId || !req.user.role) {
    throw new AppError(401, "Unauthorized request");
  }

  const whereCondition =
    req.user.role === Role.CUSTOMER
      ? { customerId: req.user.userId }
      : req.user.role === Role.PROVIDER
      ? { gearItem: { providerId: req.user.userId } }
      : {};

  const rentals = await prisma.rentalOrder.findMany({
    where: whereCondition,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      gearItem: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({
    success: true,
    message: "Rental orders retrieved successfully",
    data: rentals,
  });
});

export const getRentalById = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId || !req.user.role) {
    throw new AppError(401, "Unauthorized request");
  }

  const rentalOrderId = String(req.params.id);

  const rental = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      gearItem: true,
      payment: true,
    },
  });

  if (!rental) {
    throw new AppError(404, "Rental order not found");
  }

  const isCustomerOwner = rental.customerId === req.user.userId;
  const isProviderOwner = rental.gearItem.providerId === req.user.userId;
  const isAdmin = req.user.role === Role.ADMIN;

  if (!isCustomerOwner && !isProviderOwner && !isAdmin) {
    throw new AppError(403, "You are not allowed to access this rental order");
  }

  res.status(200).json({
    success: true,
    message: "Rental order retrieved successfully",
    data: rental,
  });
});

export const updateRentalStatus = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) {
    throw new AppError(401, "Unauthorized request");
  }

  const rentalOrderId = String(req.params.id);

  const rental = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
    include: {
      gearItem: true,
    },
  });

  if (!rental) {
    throw new AppError(404, "Rental order not found");
  }

  if (rental.gearItem.providerId !== req.user.userId) {
    throw new AppError(403, "You can update only orders for your own gear");
  }

  const { status } = req.body;

  const stockReleasingStatuses: RentalOrderStatus[] = [
    RentalOrderStatus.CANCELLED,
    RentalOrderStatus.RETURNED,
  ];
  const shouldReleaseStock =
    stockReleasingStatuses.includes(status) &&
    !stockReleasingStatuses.includes(rental.status);

  const updated = await prisma.$transaction(async (tx) => {
    const updatedOrder = await tx.rentalOrder.update({
      where: { id: rentalOrderId },
      data: { status },
    });

    if (shouldReleaseStock) {
      const restoredStock = rental.gearItem.stock + 1;
      await tx.gearItem.update({
        where: { id: rental.gearItemId },
        data: {
          stock: restoredStock,
          isAvailable: restoredStock > 0,
        },
      });
    }

    return updatedOrder;
  });

  res.status(200).json({
    success: true,
    message: "Rental order status updated successfully",
    data: updated,
  });
});
