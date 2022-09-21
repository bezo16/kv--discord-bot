const fs = require('fs')
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const cc = JSON.parse(fs.readFileSync(`${appDir}/data/cc.json`));
const sendImg = require('../functions/sendImageQuote')
const sendRandomCC = require('../functions/sendRandomCC')
const sendRandomCCImage = require('../functions/sendRandomCCImage')

function ccHandler(message, client) {
  const { channelId } = message

  if (message.content.split(' ').length === 2) {
    const firstWord = message.content.split(' ')[0].toLowerCase()
    const secondWord = message.content.split(' ')[1].toLowerCase()

    if (firstWord === '?cc' || firstWord === '?cci') {
      if (secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length - 1) !== '.' && secondWord.includes('.') && (firstWord === '?cc' || firstWord === '?cci')) {
        let canto = secondWord.split('.')[0]
        let chapter = secondWord.split('.')[1]
        let quote = secondWord.split('.')[2]
        if (!Number.isNaN(canto) && !Number.isNaN(chapter) && !Number.isNaN(quote)) {
          if (canto < 1) canto = 1
          if (chapter < 1) chapter = 1
          if (quote < 1) quote = 1
          if (canto > 12) canto = 12
          if (cc[canto - 1].length < chapter) chapter = cc[canto - 1].length
          if (cc[canto - 1][chapter - 1].length < quote) quote = cc[canto - 1][chapter - 1].length
          if (firstWord === '?cc')message.channel.send(cc[canto - 1][chapter - 1][quote - 1])
          else sendImg(client, channelId, cc[canto - 1][chapter - 1][quote - 1], `Śrī Caitanya-Caritāmrta ${canto}.${chapter}.${quote}`)
        }
      }

      if (firstWord === '?cc' && secondWord === 'r') {
        sendRandomCC(client, channelId)
      }

      if (firstWord === '?cci' && secondWord === 'r') {
        sendRandomCCImage(client, channelId)
      }
    }
  }
}

module.exports = ccHandler
