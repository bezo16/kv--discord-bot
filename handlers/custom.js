const sendImg = require('../functions/sendImageQuote')
const ekadashiDates = require('../data/eka')
const moment = require('moment')

function custom(message,client) {
    const channelId = message.channelId

    if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
        let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
        let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
        sendImg(client,channelId,`${text}`,`${book}`)
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

    if(message.content.split(' ')[0].toLowerCase() === '?numname' && message.content.split(' ').length === 3) {
        const firstName = message.content.split(' ')[1].split('')
        const surName = message.content.split(' ')[2].split('')
        let firstNameNum = 0
        let surnameNameNum = 0

        console.log(firstName,surName)

        const letters = {
            'a': 1,'i': 1,'j': 1,'q': 1,'y': 1,
            'b': 2,'c': 2,'k': 2,'r': 2,
            'g': 3,'l': 3,'s': 3,
            'd': 4,'m': 4,'t': 4,
            'n': 5,'e': 5,
            'u': 6,'v': 6,'w': 6,'x': 6,
            'o': 7,'z': 7,
            'f': 8,'h': 8,'p': 8,
        }
        
        firstName.forEach(letter => {
            firstNameNum += letters[letter.toLowerCase()]
        })
        surName.forEach(letter => {
            surnameNameNum += letters[letter.toLowerCase()]
        })

        let resultNum = firstNameNum + surnameNameNum

        while (resultNum >= 10) {
            let sumedNum = 0
            let splitedResultNumArr = resultNum.toString().split('')
            splitedResultNumArr.forEach(num => sumedNum += Number(num))
            console.log(sumedNum)
            resultNum = sumedNum
        }


        message.channel.send(`first name: ${firstNameNum} surname: ${surnameNameNum} result num: ${resultNum}`)
    }

    if(message.content.split(' ')[0].toLowerCase() === '?numpsychic' && message.content.split(' ').length === 2) {
        let dateArr = message.content.split(' ')[1].split('.')[0].split('')
        let psychicNum = 0
        dateArr.forEach(n => psychicNum += Number(n))

        message.channel.send(`psychic num is: ${psychicNum}`)
    }

    if(message.content.split(' ')[0].toLowerCase() === '?numdestiny' && message.content.split(' ').length === 2) {
        let dateArr = message.content.split(' ')[1].split('.').join('').split('')
        let destinyNum = 0
        console.log(dateArr)
        dateArr.forEach(n => {
            destinyNum += Number(n)
            let destinyNumStr = destinyNum.toString()
            if(destinyNum >= 10) destinyNum = Number(destinyNumStr.split('')[0]) + Number(destinyNumStr.split('')[1])
        })

        message.channel.send(`destiny num is: ${destinyNum}`)
    }
}



module.exports = custom