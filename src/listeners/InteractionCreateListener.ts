import { Interaction } from "discord.js";
import { StatsCommand } from "../commands/StatsCommand";
import { DiscordChatInputCommand } from "../types/DiscordChatInputCommand";
import { QuoteCommand } from "../commands/QuoteCommand";

const globalChatInputCommandMap = new Map<string, DiscordChatInputCommand>();

function registerGlobalChatInputCommand(
  discordChatInputCommand: DiscordChatInputCommand
): void {
  globalChatInputCommandMap.set(
    discordChatInputCommand.commandConfiguration.name,
    discordChatInputCommand
  );
}

registerGlobalChatInputCommand(new StatsCommand());
registerGlobalChatInputCommand(new QuoteCommand());

export async function interactionCreateListener(
  interaction: Interaction
): Promise<void> {
  // Handle commands
  if (interaction.isChatInputCommand()) {
    let discordCommand = globalChatInputCommandMap.get(interaction.commandName);
    if (!discordCommand) {
      return;
    }
    try {
      await discordCommand.handle(interaction);
    } catch (e) {
      console.error(
        `The command ${discordCommand.commandConfiguration.name} encountered an error while running.`,
        e
      );
    }
    return;
  }
}
