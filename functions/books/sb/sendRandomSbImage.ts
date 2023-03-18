import sb from "../../../data/sb/sb"
import sendImg from "../../canvas/sendImageQuote"
import { Message } from "discord.js"
import findSBQuote from "./findSbQuote"

function sendRandomSbImage(message: Message) {
  const cantoNum = Math.floor(Math.random() * 12)
  const chapterNum = Math.floor(Math.random() * sb[cantoNum].length)
  const quoteNum = Math.floor(Math.random() * sb[cantoNum][chapterNum].length)
  const resultQuote = findSBQuote( `${cantoNum}.${chapterNum}.${quoteNum}`, message)
  sendImg(message, resultQuote!.text, `Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote?.number}`)
}

export default sendRandomSbImage
