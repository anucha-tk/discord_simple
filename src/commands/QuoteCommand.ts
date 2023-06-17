import { ChatInputCommandInteraction, User } from "discord.js";
import { DiscordChatInputCommand } from "../types/DiscordChatInputCommand";
import { prismaClient } from "../Bot";

function getUsername(user: User): string {
  return user.username;
}

export class QuoteCommand extends DiscordChatInputCommand {
  constructor() {
    super({
      name: "quote",
      description: "see src/utils/RegisterCommandsUtils.ts",
    });
  }

  async handle(commandInteraction: ChatInputCommandInteraction): Promise<void> {
    await commandInteraction.deferReply();
    const username = getUsername(commandInteraction.user);

    const lines = ["**Quote**"];
    const quoteTotal = await prismaClient.quote.count();
    const quoteId = Math.floor(Math.random() * quoteTotal) + 1;
    const quote = await prismaClient.quote.findUnique({
      where: { id: quoteId },
    });

    lines.push("```md"); // Start of markdown code block

    // Add table headers
    lines.push("| Quote | Author |");
    lines.push("| -------- | -------- |");

    // Add table rows
    lines.push(`| ${quote?.quote} | ${quote?.author} |`);

    lines.push("```"); // End of markdown code block
    lines.push(`username: ${username}`); // End of markdown code block

    await commandInteraction.editReply({
      content: lines.join("\n"),
    });
    return;
  }
}
