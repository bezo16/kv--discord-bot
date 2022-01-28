require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const express = require('express')
const app = express()
// FUNKCIE + HANDLERE
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./handlers/bgHandler');
const sbHandler = require('./handlers/sbHandler');
const ccHandler = require('./handlers/ccHandler');
const fbHandler = require('./handlers/fbHandler');
const kvEvents = require('./handlers/kvEvents');
const ekadashi = require('./handlers/ekadashi');
const dailyQuotes = require('./handlers/dailyQuotes')
const custom = require('./handlers/custom');

client.once('ready',() => {     
    ekadashi()
    dailyQuotes(client)
    fbHandler()

    // postImageInstagram() 


})

client.on('message',message => { 
    if(message.author.bot) return 
    
    bgHandler(message)
    sbHandler(message) 
    ccHandler(message)

    if(message.content === '?purna') message.channel.send('prijemny mlady oddany a talentovany barber')

    kvEvents(message)
    custom(message)

})
client.login(process.env.TOKEN)


app.use(express.static('temp'))
app.get('/',(req,res) => {res.send('pes')})
app.listen(7777)
