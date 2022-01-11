require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
// FUNKCIE + HANDLERE
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./handlers/bgHandler');
const sbHandler = require('./handlers/sbHandler');
const ccHandler = require('./handlers/ccHandler');
const kvEvents = require('./handlers/kvEvents');
const ekadashi = require('./handlers/ekadashi');
const dailyQuotes = require('./handlers/dailyQuotes')
const custom = require('./handlers/custom');

client.once('ready',() => {   
    ekadashi()
    dailyQuotes(client)

    setTimeout(() => {
        postImageInstagram() 
        setTimeout(postImageInstagram,3600000 * 10)
    }, 3600000 * 10);
    
})
client.on('message',message => { 
    if(message.author.bot) return 
    
    bgHandler(message)
    sbHandler(message) 
    ccHandler(message)

    kvEvents(message)
    custom(message)
})
client.login(process.env.TOKEN) 