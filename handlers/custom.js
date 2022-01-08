const Discord = require('discord.js')

function custom(message) {

    if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
        let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
        let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
        sendImageQuote(message,`${text}`,`${book}`)
        setTimeout(() => {
            message.delete()
            }, 2000);
        }
}



module.exports = custom