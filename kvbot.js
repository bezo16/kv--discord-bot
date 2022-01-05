require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs') 
// config knižnic
const client = new Discord.Client()
// DATA
const sb = JSON.parse(fs.readFileSync(__dirname + '/data/sb2.json'));
const cc = JSON.parse(fs.readFileSync(__dirname + '/data/cc.json'));  
const bg = JSON.parse(fs.readFileSync(__dirname + '/data/BG-cs.json'));
const bgsk = JSON.parse(fs.readFileSync(__dirname + '/data/BG-sk.json'));
// FUNKCIE
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./functions/bgHandler');
const sbHandler = require('./functions/sbHandler');
const ccHandler = require('./functions/ccHandler');
const kvEvents = require('./functions/kvEvents');
const ekadashi = require('./functions/ekadashi');
const dailyQuotes = require('./functions/dailyQuotes')
const sendImageQuote = require('./functions/sendImageQuote')
// FONTS 
const { registerFont} = require('canvas') 
registerFont('./fonts/Gabriola.ttf', { family: 'Comic Sans' })



client.once('ready',() => {   
    ekadashi()
    dailyQuotes(client)
    
})

client.on('message',message => { 

    if(message.content.split(" ").length === 2) { 

    bgHandler(message,bg,sendImageQuote)
    sbHandler(message,sb,sendImageQuote) 
    ccHandler(message,cc,sendImageQuote)

    kvEvents(message)
} 
                

    if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
        let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
        let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
        sendImageQuote(message,`${text}`,`${book}`)
        setTimeout(() => {
            message.delete()
            }, 2000);
        }

if( message.author.bot){return;}
})
client.login(process.env.TOKEN) 