import sb from "../../../data/sb/sb"
import sendImg from "../../canvas/sendImageQuote"
import { Message } from "discord.js"
import findSBQuote from "./findSbQuote"

function sendRandomSbImage(message: Message) {
  const cantoNum = Math.floor(Math.random() * 12)
  const chapterNum = Math.floor(Math.random() * sb[cantoNum].length)
  const quoteNum = Math.floor(Math.random() * sb[cantoNum][chapterNum].length)
  const resultQuote = findSBQuote( `${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`, message)
  sendImg(message, resultQuote!.text, `Śrīmad-Bhāgavatam ${cantoNum + 1}.${chapterNum + 1}.${resultQuote?.number}`)
}

export default sendRandomSbImage
