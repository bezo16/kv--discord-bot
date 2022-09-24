import Discord, { Message, Client } from 'discord.js' 
import sb from '../data/sb/sb2'
import rkQuotesSb from '../data/sb/rk-sb'
import sendImg from '../functions/utils/sendImageQuote'
import sendRandomSb from '../functions/sb/sendRandomSb'
import sendRandomSbImage from '../functions/sb/sendRandomSbImage'

function sbHandler(message: Message, client: Client) {
  const { channelId } = message

  const firstWord = message.content.split(' ')[0]
  if (!["?sb", "?sbi"].includes(firstWord)) return
  const secondWord = message.content.split(' ')[1]

    if (secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length - 1) !== '.' && secondWord.includes('.')) {
      const words = message.content.split(' ')[1].split('.').map(w => Number(w))
      console.log(words)
      if (words.some(w => !w)) return
      let [canto, chapter, quote] = words

      if (!Number.isNaN(canto) && !Number.isNaN(chapter) && !Number.isNaN(quote)) {
        canto = Number(canto)
        chapter = Number(chapter)
        quote = Number(quote)
        if (canto < 1) canto = 1
        if (chapter < 1) chapter = 1
        if (quote < 1) quote = 1
        if (canto > 12) canto = 12
        if (sb[canto - 1].length < chapter) chapter = sb[canto - 1].length
        if (sb[canto - 1][chapter - 1].length < quote) quote = sb[canto - 1][chapter - 1].length

        const sendMessageText = sb[canto - 1][chapter - 1][quote - 1]

        if (firstWord.toLowerCase() === '?sb') {
          const srimadEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(` ${sendMessageText} \n [Śrīmad-Bhāgavatam ${canto}.${chapter}.${quote}](https://vedabase.io/cs/library/sb/${canto}/${chapter}/${quote}/)`)
          message.channel.send({ embeds: [srimadEmbed] })
        } else {
          sendImg(client, channelId, sendMessageText, ` Śrīmad-Bhāgavatam ${canto}.${chapter}.${quote}`)
        }
      }
    }

    if (secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === '?sb') sendRandomSb(client, channelId)
    if (secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === '?sbi') sendRandomSbImage(client, channelId)

    // if (secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === '?sb') {
    //   // const selQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)].split('.').map(w => Number(w)) TODO
    //   const selQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)].split('.').map(w => Number(w)) 
    //   const [cantoNum, chapterNum, quoteNum] = selQuote
    //   message.channel.send(` Śrīmad-Bhāgavatam ${sb[cantoNum - 1][chapterNum - 1][quoteNum - 1]} ** Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum} **`)
    // }

    if (secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === '?sbi') {
      let selQuote = ''
      while (!selQuote) {
        const quote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)]
        if (typeof (quote) === 'string') selQuote = quote
      }
      const cantoNum = Number(selQuote.split('.')[0])
      const chapterNum = Number(selQuote.split('.')[1])
      const quoteNum = Number(selQuote.split('.')[2])
      sendImg(client, channelId, sb[cantoNum - 1][chapterNum - 1][quoteNum - 1], `Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}`)
    }
}

export default sbHandler
