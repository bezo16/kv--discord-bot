import { GatewayIntentBits, REST, Routes, Client } from "discord.js"

import express from "express"
import path from "path"

// FUNCTIONS + HANDLERS
import sendRandomBg from "./functions/books/bg/sendRandomBg"
import sendRandomBgImage from "./functions/books/bg/sendRandomBgImage"
import sendRandomSb from "./functions/books/sb/sendRandomSb"
import sendRandomSbImage from "./functions/books/sb/sendRandomSbImage"
import sendRandomCC from "./functions/books/cc/sendRandomCC"
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
import { Handler, Modal } from "./commands/CreateEventEmbed"
import createEvent from "./functions/events/createEvent"

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
  if (interaction.commandName === "createevent") interaction.showModal(Modal)
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
})


client.on("messageCreate", (message) => {
  if (message.author.bot) return
  message.content = message.content.toLowerCase()
  bgHandler(message, client)
  sbHandler(message, client)
  ccHandler(message, client)
  siHandler(message, client)
  npHandler(message, client)
  brsmHandler(message, client)
  chatGPTHandler(message)
  buttonsHandler(message)

  eventReminder(client, message)
  vedicMantras(message)
  kvEvents(client, message)
  custom(message, client)
})
client.login(process.env.TOKEN)

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string)
rest.put(
  Routes.applicationGuildCommands("814813554510659594", "810552435470237717"),
  { body: [Handler] },
)


app.use("/temp", express.static(path.join(__dirname, "/public")))
app.use("/img", express.static(path.join(__dirname, "/img")))
app.get("/", (req, res) => {
  res.send("pes")
})
app.listen(7777)
