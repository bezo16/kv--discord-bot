import { config } from "dotenv"
config()
// Handlers
import cronFunctions from "./handlers/cronFunctions"
import slashCommandsHandler from "./handlers/interactions/slashCommandsHandler"
import modalSubmissionHandler from "./handlers/interactions/modalSubmissionHandler"
import messageHandler from "./handlers/messages/messageHandler"
// Inits
import restInit from "./functions/init/restInit"
import clientInit from "./functions/init/clientInit"
import contextMenuHandler from "./handlers/interactions/contextMenuHandler"


const client = clientInit()

// Initial Load
client.once("ready", () => {
  cronFunctions(client)
  restInit()
})

// Interactions
client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) slashCommandsHandler(interaction)
  if (interaction.isUserContextMenuCommand()) contextMenuHandler(interaction)
  if (interaction.isModalSubmit()) modalSubmissionHandler(interaction, client)
})

// Messages
client.on("messageCreate", (message) => {
  if (!message.author.bot) messageHandler(message, client)
})

client.login(process.env.TOKEN)