const sendImg = require('../functions/sendImageQuote')

function custom(message) {

    if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
        let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
        let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
        message.channel.send('workin')
        sendImg(message,`${text}`,`${book}`)
        setTimeout(() => {
            message.delete()
            }, 2500);
        }
}



module.exports = custom