import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export async function generateRegisterCommandsBody(): Promise<
  RESTPostAPIApplicationCommandsJSONBody[]
> {
  const globalCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  globalCommands.push(
    ...[
      {
        name: "stats",
        description: "View the stats for the bot.",
      },
      {
        name: "quote",
        description: "Random Quote.",
      },
    ]
  );
  return globalCommands;
}
