const si = require('../data/si')

function siHandler(message, client) {
  const { channelId } = message
  const messageWords = message.content.split(' ').length
  const firstWord = message.content.split(' ')[0].toLowerCase()
  const secondWord = message.content.split(' ')[1].toLowerCase()

  if (messageWords !== 2 || firstWord !== '?si') return

  if (!Number(secondWord)) {
    client.channels.cache.get(channelId).send(`${secondWord} isn't valid number`)
    return // second word isnt number
  }

  if (secondWord <= 0 || secondWord >= 19) {
    client.channels.cache.get(channelId).send(`${secondWord} isnt valid number enter (1-18)`)
    return // second word is number but not valid
  }

  client.channels.cache.get(channelId).send(si[secondWord - 1])
}

module.exports = siHandler
