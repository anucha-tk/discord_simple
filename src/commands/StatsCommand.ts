import { ChatInputCommandInteraction } from "discord.js";
import { DiscordChatInputCommand } from "../types/DiscordChatInputCommand";
import { prismaClient } from "../Bot";

export class StatsCommand extends DiscordChatInputCommand {
  constructor() {
    super({
      name: "stats",
      description: "see src/utils/RegisterCommandsUtils.ts",
    });
  }

  async handle(commandInteraction: ChatInputCommandInteraction): Promise<void> {
    await commandInteraction.deferReply();
    const lines = ["**Statistics**"];
    const quoteTotal = await prismaClient.quote.count();
    lines.push(`Quotes Total is ${quoteTotal}`);
    await commandInteraction.editReply({
      content: lines.join("\n"),
    });
    return;
  }
}
