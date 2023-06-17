import { Client } from "discord.js";
import { generateRegisterCommandsBody } from "../utils/RegisterCommandsUtils";

export async function registerCommandsOnDiscord(client: Client<true>) {
  const globalCommands = await generateRegisterCommandsBody();

  await client.application.commands.set(globalCommands);
}
