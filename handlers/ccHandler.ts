import type { Message } from "discord.js"
import sendImg from "../functions/canvas/sendImageQuote"
import sendRandomCC from "../functions/books/cc/sendRandomCC"
import sendRandomCCImage from "../functions/books/cc/sendRandomCCImage"
import findCcQuote from "../functions/books/cc/findCcQuote"
import createTextEmbed from "../functions/common/createTextEmbed"

function ccHandler(message: Message) {

  if (message.content.split(" ").length !== 2) return
  const firstWord = message.content.split(" ")[0]
  if (!["?cc", "?cci"].includes(firstWord)) return
  const secondWord = message.content.split(" ")[1]

  if (secondWord.charAt(0) !== "." && secondWord.charAt(secondWord.length - 1) !== "." && secondWord.includes(".")) {
    const resultQuote = findCcQuote(secondWord, message)
    if (!resultQuote) return
    const embed = createTextEmbed({ description: `${resultQuote!.text} \n\n [${resultQuote?.bookName} ${resultQuote?.chapter}.${resultQuote!.number}](https://vedabase.io${resultQuote!.link})`, title: "Hare Krišna" })
    if (firstWord === "?cc")message.channel.send({ embeds: [embed] })
    else sendImg(message, resultQuote.text, `${resultQuote?.bookName} ${resultQuote?.chapter}.${resultQuote!.number}`)
  }

  if (firstWord === "?cc" && secondWord === "r") sendRandomCC(message)
  if (firstWord === "?cci" && secondWord === "r") sendRandomCCImage(message)
}

export default ccHandler
