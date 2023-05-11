import { GatewayIntentBits, REST, Routes, Client } from "discord.js"

import express from "express"
import path from "path"

// FUNCTIONS + HANDLERS
import bgHandler from "./handlers/bgHandler"
import sbHandler from "./handlers/sbHandler"
import npHandler from "./handlers/npHandler"
import ccHandler from "./handlers/ccHandler"
import siHandler from "./handlers/siHandler"
import brsmHandler from "./handlers/brsmHandler"
import chatGPTHandler from "./handlers/chatGPTHandler"
import buttonsHandler from "./handlers/buttonsHandler"
import vedicMantras from "./handlers/vedicMantras"
import kvEvents from "./handlers/kvEvents"
import dailyQuotes from "./handlers/dailyQuotes"
import eventReminder from "./handlers/eventReminder"
import intervalsHandler from "./handlers/intervalsHandler"
import custom from "./handlers/custom"

// Commands
import { Handler as createEventHandler, Modal as createEventModal } from "./functions/slash-commands/create-event/createEventHandler"
import { Handler as findQuoteHandler, Modal as findQuoteModal } from "./functions/slash-commands/find-quote/findQuoteHandler"
import createEvent from "./functions/slash-commands/create-event/createEvent"
import findQuoteFunc from "./functions/slash-commands/find-quote/findQuoteFunc"

require("dotenv").config()

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

const app = express()

client.once("ready", () => {
  dailyQuotes(client)
  intervalsHandler(client)
})

client.on("interactionCreate", (interaction) => { // SLASH COMMANDS
  if (!interaction.isChatInputCommand()) return
  if (interaction.commandName === "createevent") interaction.showModal(createEventModal)
  if (interaction.commandName === "findquote") interaction.showModal(findQuoteModal)
})

client.on("interactionCreate", async interaction => { // MODAL SUBMITIONS
  if (!interaction.isModalSubmit()) return

  if (interaction.customId === "eventCreateModal") {
    const name = interaction.fields.getTextInputValue("name")
    const desc = interaction.fields.getTextInputValue("desc")
    const date = interaction.fields.getTextInputValue("date")
    createEvent(client, interaction.channelId as string, { name, desc, date } )
    await interaction.reply({ content: "uspešne si vytvoril událosť", ephemeral: true })
  }

  if (interaction.customId === "findQuote") {
    const book = interaction.fields.getTextInputValue("book")
    const text = interaction.fields.getTextInputValue("text")
    findQuoteFunc(interaction, book, text)
  }
})

// client.on("messageDelete", (message) => {
//   console.log(`${message.author?.username} deleted message: ${message.content}`)
// })


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
  buttonsHandler(message)
  custom(message)
  vedicMantras(message)

  eventReminder(client, message)
  kvEvents(client, message)
})
client.login(process.env.TOKEN)

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string)
rest.put(
  Routes.applicationGuildCommands("814813554510659594", "810552435470237717"),
  { body: [createEventHandler, findQuoteHandler] },
)


app.use("/temp", express.static(path.join(__dirname, "/public")))
app.use("/img", express.static(path.join(__dirname, "/img")))
app.get("/", (_, res) => {
  res.send("pes")
})
app.listen(7777)
