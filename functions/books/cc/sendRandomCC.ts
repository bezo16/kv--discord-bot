import cc from "../../../data/cc/caitanya-caritamrta"
import { Message } from "discord.js"
import findCcQuote from "./findCcQuote"
import createTextEmbed from "../../common/createTextEmbed"

function sendRandomCC(message: Message) {

  const cantoNum = Math.floor(Math.random() * 3)
  const chapterNum = Math.floor(Math.random() * cc[cantoNum].length)
  const quoteNum = Math.floor(Math.random() * cc[cantoNum][chapterNum].length)
  const resultQuote = findCcQuote(`${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`, message)
  const embed = createTextEmbed({ description: `${resultQuote!.text} \n\n [${resultQuote?.bookName} ${resultQuote?.chapter}.${resultQuote!.number}](https://vedabase.io${resultQuote!.link})`, title: "Hare Krišna" })
  message.channel.send({ embeds: [embed] })
}

export default sendRandomCC
