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

    postImageInstagram()

    

})

client.on('message',message => { 
    if(message.author.bot) return 
    
    bgHandler(message)
    sbHandler(message) 
    ccHandler(message)

    kvEvents(message)
    custom(message)

    if(message.content === 'pes') message.channel.send('DOBRY VECEEEEEERR')

})
client.login(process.env.TOKEN)