import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@gearup.com";
const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@12345";
const adminName = process.env.ADMIN_NAME ?? "GearUp Admin";

const starterCategories = [
  { name: "Camping", slug: "camping" },
  { name: "Cycling", slug: "cycling" },
  { name: "Fitness", slug: "fitness" },
  { name: "Water Sports", slug: "water-sports" },
  { name: "Winter Sports", slug: "winter-sports" },
];

async function main() {
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      password: hashedPassword,
      role: Role.ADMIN,
      status: "ACTIVE",
    },
    create: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
      status: "ACTIVE",
    },
  });

  for (const category of starterCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
  }

  console.log(`Seeded admin: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });