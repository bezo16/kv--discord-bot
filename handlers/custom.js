const sendImg = require('../functions/sendImageQuote')
const ekadashiDates = require('../data/eka')
const moment = require('moment')

function custom(message) {

    if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
        let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
        let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
        sendImg(message,`${text}`,`${book}`)
        setTimeout(() => {
            message.delete()
            }, 2000);
        }


    if(message.content === '?ekadashi') {
        let ekadashiFound = false
        ekadashiDates.forEach(eka => {
            let date1 = moment(eka.date)
            let diff = date1.diff(moment(),'days')

            let month = eka.date.split(' ')[0].split('-')[1]
            let day = eka.date.split(' ')[0].split('-')[2]
            let end = eka.end.split(' ')[1].split(':')[0] + ':' + eka.end.split(' ')[1].split(':')[1] + ' ' + eka.end.split(' ')[0].split('-')[2] + '.' + eka.end.split(' ')[0].split('-')[1]

            if(diff >= 0 && !ekadashiFound) {
                message.channel.send(`najbližšie ekadashi je **${eka.name}** (${day}.${month}) \nprerušenie: ${end} \n${eka.link}`)
                ekadashiFound = true
            }

        })
    }
}



module.exports = custom