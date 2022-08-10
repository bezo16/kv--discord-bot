require('dotenv').config()
const Discord = require('discord.js')
const { Intents } = require('discord.js');
const express = require('express')

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,]
})

const app = express()

// FUNCTIONS + HANDLERS
const sendRandomBg = require('./functions/sendRandomBg')
const sendRandomBgImage = require('./functions/sendRandomBgImage')
const sendRandomSb = require('./functions/sendRandomSb')
const sendRandomSbImage = require('./functions/sendRandomSbImage')
const sendRandomCC = require('./functions/sendRandomCC')
const bgHandler = require('./handlers/bgHandler')
const sbHandler = require('./handlers/sbHandler')
const ccHandler = require('./handlers/ccHandler')
const buttonsHandler = require('./handlers/buttonsHandler')
const vedicMantras = require('./handlers/vedicMantras')
const kvEvents = require('./handlers/kvEvents')
const ekadashi = require('./handlers/ekadashi')
const dailyQuotes = require('./handlers/dailyQuotes')
const eventReminder = require('./handlers/eventReminder')
const custom = require('./handlers/custom')

client.once('ready', () => {
  ekadashi(client)
  dailyQuotes(client)
})

client.on('guildMemberAdd', (guild) => {
  const welcomeText = `vítaj ${guild.user.username} v Yogapite Toto je hlavný spoločný chat, píše tu veľa ľudí a rieši sa tu naozaj kadečo. Občas tu zahliadneš svetské záležitosti ale poväčšine tu riešime Krišnu. Vľavo hore je menu, vyroluje sa ti panel s pod-témami, kde sa konkrétnejšie rozoberajú rôzne dilemy. V pravo keď potiahneš prstom v každom chate sú “Piny”, tu nájdeš pripnuté dôležité/zaujímavé správy. Keď sa vrátiš späť k témam, pod týmito témami sú hlasové kanály. Tu sa prehrávajú prednášky. Máme spoločné programy: púšťame záznamy z prednášok každú stredu cca o 16:00, čítanie cca o 19:00 každý štvrtok a v nedeľu o 15:00 prednáška, buď live s duchovným učiteľom alebo sa prehrá znovu záznam z prednášky. Ďalej môžeš nájsť aj rádio, ktoré prehráva rôzne kirtany a mantry. 🙂 Ak by bolo dačo sme tu, každý ti tu rád odpovie na otázky.`
  client.channels.cache.get(process.env.MAINCHANNELID).send(welcomeText)
  console.log(guild)
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
  bgHandler(message, client)
  sbHandler(message, client)
  ccHandler(message, client)
  buttonsHandler(message)

  eventReminder(client, message)
  vedicMantras(message)
  kvEvents(message)
  custom(message, client)
})
client.login(process.env.TOKEN)

app.use(express.static('temp'))
app.get('/', (req, res) => {
  res.send('pes')
})
app.listen(7777)
