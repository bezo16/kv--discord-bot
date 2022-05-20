require('dotenv').config()
const Discord = require('discord.js')
const { Intents } = require('discord.js');
const client = new Discord.Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
] })
const express = require('express')
const app = express()
// FUNKCIE + HANDLERE
const sendRandomBg = require('./functions/sendRandomBg');
const sendRandomBgImage = require('./functions/sendRandomBgImage');
const sendRandomSb = require('./functions/sendRandomSb');
const sendRandomSbImage = require('./functions/sendRandomSbImage');
const sendRandomCC = require('./functions/sendRandomCC');
const sendRandomCCImage = require('./functions/sendRandomCCImage');
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./handlers/bgHandler');
const sbHandler = require('./handlers/sbHandler');
const ccHandler = require('./handlers/ccHandler');
const fbHandler = require('./handlers/fbHandler');
const buttonsHandler = require('./handlers/buttonsHandler');
const vedicMantras = require('./handlers/vedicMantras');
const kvEvents = require('./handlers/kvEvents');
const ekadashi = require('./handlers/ekadashi');
const dailyQuotes = require('./handlers/dailyQuotes')
const eventReminder = require('./handlers/eventReminder')
const custom = require('./handlers/custom');
client.once('ready',() => {     
    ekadashi(client)
    dailyQuotes(client)
    // fbHandler() 


    // postImageInstagram() 



})

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction); 
    if(interaction.customId === 'bg') sendRandomBg(client,interaction.channelId)
    if(interaction.customId === 'bg-img') sendRandomBgImage(client,interaction.channelId)
    if(interaction.customId === 'sb') sendRandomSb(client,interaction.channelId)
    if(interaction.customId === 'sb-img') sendRandomSbImage(client,interaction.channelId)
    if(interaction.customId === 'cc') sendRandomCC(client,interaction.channelId)
    if(interaction.customId === 'cc-img') sendRandomSbImage(client,interaction.channelId)
});

client.on('messageCreate',message => { 
    if(message.author.bot) return 
    
    bgHandler(message,client)
    sbHandler(message,client) 
    ccHandler(message,client)
    buttonsHandler(message)



    eventReminder(client,message)
    vedicMantras(message)
    kvEvents(message)
    custom(message,client)

})
client.login(process.env.TOKEN)


app.use(express.static('temp'))
app.get('/',(req,res) => {res.send('pes')})
app.listen(7777)
