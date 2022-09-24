import sb from '../../data/sb/sb2'
import sendImg from '../utils/sendImageQuote'
import { Client } from 'discord.js'

function sendRandomSbImage(client: Client, channelId: string) {
  const cantoNum = Math.floor(Math.random() * 12)
  const canto = sb[cantoNum]
  const chapterNum = Math.floor(Math.random() * canto.length)
  const chapter = canto[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  sendImg(client, channelId, chapter[quoteNum], ` Śrīmad-Bhāgavatam ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`)
}

export default sendRandomSbImage
