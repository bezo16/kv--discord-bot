import Discord, { Intents } from 'discord.js'

import express from 'express'
import path from 'path'

// FUNCTIONS + HANDLERS
import sendRandomBg from './functions/bg/sendRandomBg'
import sendRandomBgImage from './functions/bg/sendRandomBgImage'
import sendRandomSb from './functions/sb/sendRandomSb'
import sendRandomSbImage from './functions/sb/sendRandomSbImage'
import sendRandomCC from './functions/cc/sendRandomCC'
import bgHandler from './handlers/bgHandler'
import sbHandler from './handlers/sbHandler'  
import npHandler from './handlers/npHandler'
import ccHandler from './handlers/ccHandler'
import siHandler from './handlers/siHandler'
import brsmHandler from './handlers/brsmHandler'
import chatGPTHandler from './handlers/chatGPTHandler'
import buttonsHandler from './handlers/buttonsHandler'
import vedicMantras from './handlers/vedicMantras'
import kvEvents from './handlers/kvEvents'
import ekadashi from './handlers/ekadashi'
import dailyQuotes from './handlers/dailyQuotes'
import eventReminder from './handlers/eventReminder'
import custom from './handlers/custom'

require('dotenv').config()

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,]
})

const app = express()

client.once('ready', () => {
  ekadashi(client)
  dailyQuotes(client)
})

client.on('interactionCreate', (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'bg') sendRandomBg(client, interaction.channelId)
    if (interaction.customId === 'bg-img') sendRandomBgImage(client, interaction.channelId)
    if (interaction.customId === 'sb') sendRandomSb(client, interaction.channelId)
    if (interaction.customId === 'sb-img') sendRandomSbImage(client, interaction.channelId)
    if (interaction.customId === 'cc') sendRandomCC(client, interaction.channelId)
    if (interaction.customId === 'cc-img') sendRandomSbImage(client, interaction.channelId)
  }
});

client.on('messageCreate', (message) => {
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
  kvEvents(message)
  custom(message, client)
})
client.login(process.env.TOKEN)

app.use('/temp', express.static(path.join(__dirname, '/public')))
app.use('/img', express.static(path.join(__dirname, '/img')))
app.get('/', (req, res) => {
  res.send('pes')
})
app.listen(7777)
