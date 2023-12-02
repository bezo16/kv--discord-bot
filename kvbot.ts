import { GatewayIntentBits, REST, Routes, Client } from "discord.js"
import { config } from "dotenv"
// Handlers
import bgHandler from "./handlers/bgHandler"
import sbHandler from "./handlers/sbHandler"
import npHandler from "./handlers/npHandler"
import ccHandler from "./handlers/ccHandler"
import siHandler from "./handlers/siHandler"
import brsmHandler from "./handlers/brsmHandler"
import chatGPTHandler from "./handlers/chatGPTHandler"
import vedicMantras from "./handlers/vedicMantras"
import kvEvents from "./handlers/kvEvents"
import cronFunctions from "./handlers/cronFunctions"
import eventReminder from "./handlers/eventReminder"
import custom from "./handlers/custom"
import slashCommandsHandler from "./handlers/interactions/slashCommandsHandler"
// Commands
import { Handler as createEventHandler } from "./functions/slash-commands/create-event/createEventHandler"
import { Handler as findQuoteHandler} from "./functions/slash-commands/find-quote/findQuoteHandler"
import createEvent from "./functions/slash-commands/create-event/createEvent"
import findQuoteFunc from "./functions/slash-commands/find-quote/findQuoteFunc"
import sanskritHandler from "./handlers/sanskritHandler"
import langChainHandler from "./handlers/langChainHandler"
import modalSubmissionHandler from "./handlers/interactions/modalSubmissionHandler"


config()
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ]
})

// Initial Load
client.once("ready", () => {
  cronFunctions(client)
})

// Interactions
client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) slashCommandsHandler(interaction)
  if (interaction.isModalSubmit()) modalSubmissionHandler(interaction, client)
})

// Messages
client.on("messageCreate", (message) => {
  if (message.author.bot) return
  message.content = message.content.toLowerCase()
  bgHandler(message)
  sbHandler(message)
  ccHandler(message)
  siHandler(message)
  npHandler(message)
  brsmHandler(message)
  chatGPTHandler(message)
  custom(message)
  vedicMantras(message)
  sanskritHandler(message)
  langChainHandler(message)
  eventReminder(client, message)
  kvEvents(client, message)
})
client.login(process.env.TOKEN)

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string)
rest.put(
  Routes.applicationGuildCommands("814813554510659594", "810552435470237717"),
  { body: [createEventHandler, findQuoteHandler] },
)
