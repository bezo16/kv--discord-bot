
import bg from "../../../data/bg/BG-cs"
import sendImg from "../../canvas/sendImageQuote"
import { Client } from "discord.js"

function sendRandomBgImage(client: Client, channelId: string) {
  // data
  const chapter = Math.floor(Math.random() * 18)
  const chapterText = Math.floor(Math.random() * bg[chapter].length)
  const resultText = bg[chapter][chapterText].text
  const resultQuote = `Bhagavad-Gītā ${chapter + 1}.${chapterText + 1}`
  // output
  sendImg(client, channelId, resultText, resultQuote)
}

export default sendRandomBgImage
