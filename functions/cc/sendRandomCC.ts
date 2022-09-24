import cc from '../../data/cc/cc'
import { Client, TextChannel } from 'discord.js'

function sendRandomCC(client: Client, channelId: string) {
  const channel = client.channels.cache.get(channelId) as TextChannel

  const cantoNum = Math.floor(Math.random() * 3)
  const canto = cc[cantoNum]
  const chapterNum = Math.floor(Math.random() * canto.length)
  const chapter = canto[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  channel.send({ content: `${chapter[quoteNum]} ** ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1} ** ` })
}

export default sendRandomCC
