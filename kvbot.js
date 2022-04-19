require('dotenv').config()
const Discord = require('discord.js')
const { Intents } = require('discord.js');
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const express = require('express')
const app = express()
// FUNKCIE + HANDLERE
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./handlers/bgHandler');
const sbHandler = require('./handlers/sbHandler');
const ccHandler = require('./handlers/ccHandler');
const fbHandler = require('./handlers/fbHandler');
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

    eventReminder(client)


})

client.on('messageCreate',message => { 
    if(message.author.bot) return 
    
    bgHandler(message)
    sbHandler(message) 
    ccHandler(message)



    vedicMantras(message)
    kvEvents(message)
    custom(message)

})
client.login(process.env.TOKEN)


app.use(express.static('temp'))
app.get('/',(req,res) => {res.send('pes')})
app.listen(7777)
