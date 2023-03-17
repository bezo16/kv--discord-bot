import { Message, Client, EmbedBuilder } from "discord.js"
import bg from "../data/bg/BG-cs"
import bgsk from "../data/bg/BG-sk"
import rkQuotesBg from "../data/bg/rk-bg"
import sendImg from "../functions/canvas/sendImageQuote"

import sendRandomBg from "../functions/books/bg/sendRandomBg"
import sendRandomBgImage from "../functions/books/bg/sendRandomBgImage"

function bgHandler(message: Message, client: Client) {
  const { channelId } = message
  const words = message.content.split(" ").length

  if (words !== 2) return
  const firstWord = message.content.split(" ")[0]
  const secondWord = message.content.split(" ")[1]

  if (!["?bg", "?bgi", "?bgsk", "?bgisk"].includes(firstWord)) return

  if (secondWord.includes(".") && secondWord.charAt(0) !== "." && secondWord.charAt(secondWord.length - 1) !== ".") {
    const splitSecondWord = secondWord.split(".").map(w => Number(w))
    if (splitSecondWord.some(w => !w)) return
    const [chapterNum, quoteNum] = splitSecondWord

    if (Number.isNaN(quoteNum) && Number.isNaN(quoteNum)) return message.channel.send("wrong numbers")
    if (chapterNum < 1 || chapterNum > 18) return message.channel.send("wrong chapter number")
    if (quoteNum < 1 || quoteNum > Number(bg[chapterNum - 1][bg[chapterNum - 1].length - 1].number)) return message.channel.send("wrong quote number")

    const quoteIndex = bg[chapterNum - 1].findIndex(q => {
      if (q.number === String(quoteNum)) return true
      if (q.number.includes("-")) {
        const firstNum = q.number.split("-")[0]
        const secondNum = q.number.split("-")[1]
        if (quoteNum >= Number(firstNum) && quoteNum <= Number(secondNum)) return true
      }
    })
    const resultQuote = bg[chapterNum - 1][quoteIndex]

    // if (firstWord === "?bgsk" || firstWord === "?bgisk") resultText = bgsk[chapterNum - 1][quoteNum - 1]
    if (firstWord === "?bgi" || firstWord === "?bgisk") sendImg(client, channelId, resultQuote.text, `Bhagavad-Gītā ${chapterNum}.${quoteNum}`)

    if (firstWord === "?bg" || firstWord === "?bgsk") {
      const gitaEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Hare Krišna")
        .setDescription(`${resultQuote.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`)
      message.channel.send({ embeds: [gitaEmbed] })
    }
  }

  if (secondWord === "r" && firstWord === "?bg") {
    sendRandomBg(client, channelId)
  }
  if (secondWord === "r" && firstWord === "?bgi") {
    sendRandomBgImage(client, channelId)
  }
  if (secondWord === "top" && firstWord === "?bg") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const chapter = Number(selectedQuoteBg[0])
    const quote = Number(selectedQuoteBg[1])
    message.channel.send(`${bg[chapter - 1][quote - 1].text}  Bhagavad-Gītā ** ${chapter}.${bg[chapter - 1][quote - 1].number} ** `)
  }
  if (secondWord === "top" && firstWord === "?bgi") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const chapter = Number(selectedQuoteBg[0])
    const quote = Number(selectedQuoteBg[1])
    sendImg(client, channelId, `${bg[chapter - 1][quote - 1]}`, `Bhagavad-Gītā ${chapter}.${quote}`)
  }
  if (secondWord === "k") {
    message.channel.send("KAPITOLA PRVÁ: Pozorovanie armád na Kuruovskom bojisku\nKAPITOLA DRUHÁ: Zhrnutie obsahu Bhagavad-gīty \nKAPITOLA TRETIA: Karma-yoga \nKAPITOLA ŠTVRTÁ: Transcendentálne poznanie \nKAPITOLA PIATA: Karma-yoga — konanie s mysľou upretou na Kṛṣṇu \nKAPITOLA ŠIESTA: Dhyāna-yoga \nKAPITOLA SIEDMA: Poznanie o Absolútnom \nKAPITOLA ÔSMA: Dosiahnutie Najvyššieho \nKAPITOLA DEVIATA: Najdôvernejšie poznanie \nKAPITOLA DESIATA: Majestát Absolútneho \nKAPITOLA JEDENÁSTA: Vesmírna podoba \nKAPITOLA DVANÁSTA: Oddaná služba \nKAPITOLA TRINÁSTA: Príroda, požívateľ, vedomie \nKAPITOLA ŠTRNÁSTA: Tri kvality hmotnej prírody \nKAPITOLA PÄTNÁSTA: Yoga Najvyššej Osobnosti \nKAPITOLA ŠESTNÁSTA: Božské a démonské povahy \nKAPITOLA SEDEMNÁSTA: Druhy viery \nOSEMNÁSTA KAPITOLA: Dokonalosť odriekania")
  }
}

export default bgHandler
