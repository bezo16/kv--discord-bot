import type { Message, Client } from 'discord.js'
import cc from '../data/cc/cc'
import sendImg from '../functions/helpers/sendImageQuote'
import sendRandomCC from '../functions/cc/sendRandomCC'
import sendRandomCCImage from '../functions/cc/sendRandomCCImage'

function ccHandler(message: Message, client: Client) {
  const { channelId } = message

  if (message.content.split(' ').length !== 2) return
  const firstWord = message.content.split(' ')[0]
  if (!['?cc', '?cci'].includes(firstWord)) return
  const secondWord = message.content.split(' ')[1]

  if (secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length - 1) !== '.' && secondWord.includes('.')) {
    const words = secondWord.split('.').map(w => Number(w))
    if (words.some(w => !w)) return
    let [canto, chapter, quote] = words
    if (canto < 1) canto = 1
    if (chapter < 1) chapter = 1
    if (quote < 1) quote = 1
    if (canto > 12) canto = 12
    if (cc[canto - 1].length < chapter) chapter = cc[canto - 1].length
    if (cc[canto - 1][chapter - 1].length < quote) quote = cc[canto - 1][chapter - 1].length
    if (firstWord === '?cc')message.channel.send(cc[canto - 1][chapter - 1][quote - 1])
    else sendImg(client, channelId, cc[canto - 1][chapter - 1][quote - 1], `Śrī Caitanya-Caritāmrta ${canto}.${chapter}.${quote}`)
  }

  if (firstWord === '?cc' && secondWord === 'r') sendRandomCC(client, channelId)
  if (firstWord === '?cci' && secondWord === 'r') sendRandomCCImage(client, channelId)
}

export default ccHandler
