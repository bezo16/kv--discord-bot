import cc from "../../../data/cc/cc"
import sendImg from "../../canvas/sendImageQuote"
import { Message } from "discord.js"
import findCcQuote from "./findCcQuote"

function sendRandomCCImage(message: Message) {
  const cantoNum = Math.floor(Math.random() * 3)
  const cantoArray = cc[cantoNum]
  const chapterNum = Math.floor(Math.random() * cantoArray.length)
  const chapter = cantoArray[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  const resultQuote = findCcQuote(`${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`, message)
  sendImg(message, resultQuote!.text, `${resultQuote?.bookName} ${resultQuote?.chapter}.${resultQuote!.number}`)
}

export default sendRandomCCImage
