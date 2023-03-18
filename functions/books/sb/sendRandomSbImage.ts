import sb from "../../../data/sb/sb2"
import sendImg from "../../canvas/sendImageQuote"
import { Message } from "discord.js"

function sendRandomSbImage(message: Message) {
  const cantoNum = Math.floor(Math.random() * 12)
  const canto = sb[cantoNum]
  const chapterNum = Math.floor(Math.random() * canto.length)
  const chapter = canto[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  sendImg(message, chapter[quoteNum], ` Śrīmad-Bhāgavatam ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`)
}

export default sendRandomSbImage
