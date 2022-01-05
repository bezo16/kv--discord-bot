require('dotenv').config()
const Discord = require('discord.js')
// config knižnic
const client = new Discord.Client()
// FUNKCIE
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./functions/bgHandler');
const sbHandler = require('./functions/sbHandler');
const ccHandler = require('./functions/ccHandler');
const kvEvents = require('./functions/kvEvents');
const ekadashi = require('./functions/ekadashi');
const dailyQuotes = require('./functions/dailyQuotes')
const sendImageQuote = require('./functions/sendImageQuote')
const custom = require('./functions/custom');
// FONTS 
const { registerFont} = require('canvas'); 
registerFont('./fonts/Gabriola.ttf', { family: 'Comic Sans' })


client.once('ready',() => {   
    ekadashi()
    dailyQuotes(client)
    // postImageInstagram('',sendImageQuote) 
    
})

client.on('message',message => { 


    bgHandler(message,sendImageQuote)
    sbHandler(message,sendImageQuote) 
    ccHandler(message,sendImageQuote)

    kvEvents(message)
    custom(message)
    

if( message.author.bot){return;}
})
client.login(process.env.TOKEN) 