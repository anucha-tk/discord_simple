import { Client } from "discord.js";
import { logger } from "../Bot";
import { registerCommandsOnDiscord } from "./registerCommand";

export async function readyListener(clientObject: Client<true>): Promise<void> {
  logger.info(
    `Logged in as ${clientObject.user.tag} (${clientObject.user.id}).`
  );
  if (process.env.REGISTER_DISCORD_COMMANDS?.toLowerCase() === "true") {
    logger.info("Registering commands on Discord.");
    await registerCommandsOnDiscord(clientObject);
  }
}
