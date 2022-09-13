// const sendImg = require('../functions/sendImageQuote')
const si = require('../data/si')

function siHandler(message, client) {
  const { channelId } = message
  if (message.content.split(' ').length <= 1) return
  const firstWord = message.content.split(' ')[0]
  const secondWord = message.content.split(' ')[1]
  if (firstWord !== 'si') return

  if (Number.isNaN(parseInt(secondWord))) {
    client.channels.cache.get(channelId).send(`${secondWord} isn't valid number`)
    return
  }

  if (secondWord <= 0 || secondWord >= 19) {
    client.channels.cache.get(channelId).send(`${secondWord} isnt valid number enter (1-18)`)
    return
  }

  if (firstWord === 'si') {
    client.channels.cache.get(channelId).send(si[secondWord - 1])
  }
}

module.exports = siHandler
