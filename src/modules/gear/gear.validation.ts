import { z } from "zod";

export const cuidIdSchema = z.string().min(1, "ID is required").cuid("Invalid id format");

export const getAllGearSchema = z.object({
  query: z
    .object({
      categoryId: cuidIdSchema.optional(),
      brand: z.string().min(1).optional(),
      search: z.string().min(1).optional(),
      minPrice: z.coerce.number().nonnegative().optional(),
      maxPrice: z.coerce.number().nonnegative().optional(),
    })
    .superRefine((value, context) => {
      if (value.minPrice !== undefined && value.maxPrice !== undefined && value.minPrice > value.maxPrice) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "minPrice cannot be greater than maxPrice",
          path: ["minPrice"],
        });
      }
    }),
});

export const gearIdParamsSchema = z.object({
  params: z.object({
    id: cuidIdSchema,
  }),
});

export const createGearSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    brand: z.string().min(1, "Brand is required"),
    categoryId: cuidIdSchema,
    pricePerDay: z.coerce.number().positive("Price per day must be positive"),
    stock: z.coerce.number().int().min(1, "Stock must be at least 1").default(1),
    isAvailable: z.boolean().default(true),
  }),
});

export const updateGearSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    brand: z.string().min(1).optional(),
    categoryId: cuidIdSchema.optional(),
    pricePerDay: z.coerce.number().positive().optional(),
    stock: z.coerce.number().int().min(0).optional(),
    isAvailable: z.boolean().optional(),
  }),
});
