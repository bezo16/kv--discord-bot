require('dotenv').config()
const moment = require('moment')
const ekadashiDates = require('../data/eka')

function ekadashi(client) {
  let ekadashiFound = false
  const channel = process.env.TESTCHANNELID

  setInterval(() => {
    if (!ekadashiFound) {
      ekadashiDates.forEach((eka) => {
        let ekadashiText = ''
        const date1 = moment(eka.date)
        const date2 = moment()
        const diff = date1.diff(date2, 'days')

        if (diff === 0 && !ekadashiFound && date2.hours() === 21) {
          ekadashiText = `Dnes (${eka.date.split('-')[2]}.${eka.date.split('-')[1]}.${eka.date.split('-')[0]}) bude ${eka.name}, prečítajte si viac: ${eka.link}`
          ekadashiFound = true
          client.channels.cache.get(channel).send(ekadashiText)
          setTimeout(() => {
            ekadashiFound = false
          }, 3600000);
        }

        if (diff === 1 && !ekadashiFound && date2.hours() === 19) {
          ekadashiText = `Zajtra (${eka.date.split('-')[2]}.${eka.date.split('-')[1]}.${eka.date.split('-')[0]}) bude ${eka.name}, prečítajte si viac: ${eka.link}`
          ekadashiFound = true
          client.channels.cache.get(channel).send(ekadashiText)
          setTimeout(() => {
            ekadashiFound = false
          }, 3600000);
        }
      })
    }
  }, 3600000);

  setInterval(() => {
    ekadashiDates.forEach((eka) => {
      if (eka.end) {
        const end = moment(eka.end)
        if (end.month() === moment().month()
        && end.day() === moment().day()
        && end.hours() === moment().hours()
        && end.minutes() === moment().minutes()) {
          const startDva = Number(eka.end.split(' ')[1].split(':')[0]) * 60 + Number(eka.end.split(' ')[1].split(':')[1])
          const endDva = Number(eka.break.split(':')[0] * 60) + Number(eka.break.split(':')[1])
          const minutesLeft = endDva - startDva
          client.channels.cache.get(channel).send(`ekadaši konči!! na ukončenie maš ${minutesLeft}minut (${eka.end.split(' ')[1].split('-')[0]}-${eka.break})`)
        }
      }
    })
  }, 60000);
}

module.exports = ekadashi
