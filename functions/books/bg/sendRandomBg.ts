import { Message } from "discord.js"
import bg from "../../../data/bg/BG-cs"
import findBgQuote from "./findBgQuote"
import createTextEmbed from "../../common/createTextEmbed"

function sendRandomBg(message: Message) {
  const chapterNum = Math.floor(Math.random() * 18)
  const quoteNum = Math.floor(Math.random() * bg[chapterNum].length)
  const resultquote = findBgQuote(`${chapterNum + 1}.${quoteNum + 1}`, message)

  if (!resultquote) {
    message.channel.send(`quote not found (${chapterNum} ${quoteNum})`)

    return
  }


  const embed = createTextEmbed({ description: `${resultquote.text} \n\n[Bhagavad-Gītā ${chapterNum}.${resultquote.number}](https://vedabase.io${resultquote.link})`, title: "Hare Krišna" })
  message.channel.send({ embeds: [embed] })
}

export default sendRandomBg
