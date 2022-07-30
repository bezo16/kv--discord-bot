const sendScreen = require('../functions/sendEventsScreen')
const sendScreenDate = require('../functions/sendEventsScreenDate')

function kvEvents(message) {
  if (!message.content.split(' ').length === 2) return
  const firstWord = message.content.split(' ')[0].toLowerCase()
  const secondWord = message.content.split(' ')[1].toLowerCase()

  if (secondWord === 'events' && firstWord === 'kv') {
    sendScreen(message)
  }

  if (secondWord.includes('events') && firstWord === 'kv' && !Number.isNaN(secondWord.charAt(6)) && secondWord.length > 6) {
    const year = secondWord.slice(6, 8)
    const month = secondWord.slice(8)

    sendScreenDate(message, { year, month })
  }
}

module.exports = kvEvents
