import { PrismaClient } from "@prisma/client";
import { logger } from "../src/Bot";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
async function main() {
  logger.info("Seeding...");
  await prisma.quote.deleteMany();

  const quotesFilePath = path.join(__dirname, "quotes.json");
  const quoteJson = JSON.parse(fs.readFileSync(quotesFilePath, "utf-8"));

  await prisma.quote.createMany({ data: quoteJson });

  logger.info("Seeding successful");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
