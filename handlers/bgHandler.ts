import { Message, Client, EmbedBuilder } from 'discord.js'
import bg from '../data/bg/BG-cs'
import bgsk from '../data/bg/BG-sk'
import rkQuotesBg from '../data/bg/rk-bg'
import sendImg from '../functions/helpers/sendImageQuote'

import sendRandomBg from '../functions/bg/sendRandomBg'
import sendRandomBgImage from '../functions/bg/sendRandomBgImage'

function bgHandler(message: Message, client: Client) {
  const { channelId } = message
  const words = message.content.split(' ').length

  if (words !== 2) return
  const firstWord = message.content.split(' ')[0]
  const secondWord = message.content.split(' ')[1]

  if (firstWord === '?bg' || firstWord === '?bgi' || firstWord === '?bgsk' || firstWord === '?bgisk') {
    if (secondWord.includes('.') && secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length - 1) !== '.') {
      const splitSecondWord = secondWord.split('.').map(w => Number(w))
      splitSecondWord.some(w => !w)
      let [chapter, chapterText] = splitSecondWord

      if (!Number.isNaN(chapterText) && !Number.isNaN(chapter)) {
        if (chapter < 1) chapter = 1
        if (chapter > 18) chapter = 18
        if (chapterText < 1) chapterText = 1
        if (chapterText > bg[chapter - 1].length) chapterText = bg[chapter - 1].length
        let resultText = bg[chapter - 1][chapterText - 1]

        // LANGUAGES
        // change to svk
        if (firstWord === '?bgsk' || firstWord === '?bgisk') resultText = bgsk[chapter - 1][chapterText - 1]

        if (firstWord === '?bgi' || firstWord === '?bgisk') sendImg(client, channelId, resultText, `Bhagavad-Gītā ${chapter}.${chapterText}`)
        else if (firstWord === '?bg' || firstWord === '?bgsk') {
          const link = `[Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`
          if ((link.length + resultText.length) <= 256) {
            const gitaEmbed = new EmbedBuilder()
              .setColor('#0099ff')
              .setTitle(resultText)
              .setDescription(`[Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
            message.channel.send({ embeds: [gitaEmbed] })
          } else {
            const gitaEmbed = new EmbedBuilder()
              .setColor('#0099ff')
              .setDescription(`${resultText} \n [Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
            message.channel.send({ embeds: [gitaEmbed] })
          }
        }
      }
    }

    if (secondWord === "r" && firstWord === '?bg') {
      sendRandomBg(client, channelId)
    }
    if (secondWord === 'r' && firstWord === '?bgi') {
      sendRandomBgImage(client, channelId)
    }
    if (secondWord === 'top' && firstWord === '?bg') {
      const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split('.')
      const chapter = Number(selectedQuoteBg[0])
      const quote = Number(selectedQuoteBg[1])
      message.channel.send(`${bg[chapter - 1][quote - 1]}  Bhagavad-Gītā ** ${chapter}.${quote} ** `)
    }
    if (secondWord === 'top' && firstWord === '?bgi') {
      const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split('.')
      const chapter = Number(selectedQuoteBg[0])
      const quote = Number(selectedQuoteBg[1])
      sendImg(client, channelId, `${bg[chapter - 1][quote - 1]}`, `Bhagavad-Gītā ${chapter}.${quote}`)
    }
    if (secondWord === 'k') {
      message.channel.send('KAPITOLA PRVÁ: Pozorovanie armád na Kuruovskom bojisku\nKAPITOLA DRUHÁ: Zhrnutie obsahu Bhagavad-gīty \nKAPITOLA TRETIA: Karma-yoga \nKAPITOLA ŠTVRTÁ: Transcendentálne poznanie \nKAPITOLA PIATA: Karma-yoga — konanie s mysľou upretou na Kṛṣṇu \nKAPITOLA ŠIESTA: Dhyāna-yoga \nKAPITOLA SIEDMA: Poznanie o Absolútnom \nKAPITOLA ÔSMA: Dosiahnutie Najvyššieho \nKAPITOLA DEVIATA: Najdôvernejšie poznanie \nKAPITOLA DESIATA: Majestát Absolútneho \nKAPITOLA JEDENÁSTA: Vesmírna podoba \nKAPITOLA DVANÁSTA: Oddaná služba \nKAPITOLA TRINÁSTA: Príroda, požívateľ, vedomie \nKAPITOLA ŠTRNÁSTA: Tri kvality hmotnej prírody \nKAPITOLA PÄTNÁSTA: Yoga Najvyššej Osobnosti \nKAPITOLA ŠESTNÁSTA: Božské a démonské povahy \nKAPITOLA SEDEMNÁSTA: Druhy viery \nOSEMNÁSTA KAPITOLA: Dokonalosť odriekania')
    }
  }
}

export default bgHandler
