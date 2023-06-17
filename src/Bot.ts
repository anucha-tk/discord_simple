import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { interactionCreateListener } from "./listeners/InteractionCreateListener";
import { readyListener } from "./listeners/ReadyListener";
import { createLogger, format, transports } from "winston";
import { PrismaClient } from "@prisma/client";

export const logger = createLogger({
  level: "debug",
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

logger.info("Start bot");

export const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

discordClient.on("interactionCreate", interactionCreateListener);
discordClient.on("ready", readyListener);

export const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.$connect();
  await discordClient.login(process.env.DISCORD_TOKEN);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
