import { Message, EmbedBuilder } from "discord.js"
import sb from "../../../data/sb/sb"
import findSBQuote from "./findSbQuote"

function sendRandomSb(message: Message) {
  const cantoNum = Math.floor(Math.random() * 12)
  const chapterNum = Math.floor(Math.random() * sb[cantoNum].length)
  const quoteNum = Math.floor(Math.random() * sb[cantoNum][chapterNum].length)
  const resultQuote = findSBQuote(`${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`, message)


  const srimadEmbed = new EmbedBuilder()
    .setColor("#0099ff")
    .setDescription(`${resultQuote?.text} \n\n[Śrīmad-Bhāgavatam ${cantoNum + 1}.${chapterNum + 1}.${resultQuote?.number}](https://vedabase.io${resultQuote?.link})`)


  message.channel.send({ embeds: [srimadEmbed] })
}

export default sendRandomSb
