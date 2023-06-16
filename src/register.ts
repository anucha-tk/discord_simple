import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN ?? "";
const CLIENT_ID = process.env.CLIENT_ID ?? "";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

(async () => {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
