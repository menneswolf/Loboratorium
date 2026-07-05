import { PrismaClient } from "@prisma/client";
import { seedProducts } from "./seed-data";

const db = new PrismaClient();

async function main() {
  for (const p of seedProducts) {
    await db.product.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }
  console.log(`Seeded ${seedProducts.length} products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
