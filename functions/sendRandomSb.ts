import Discord, { Client, TextChannel } from 'discord.js'
import sb from '../data/sb2'

function sendRandomSb(client: Client, channelId: string) {
  // data
  const channel = client.channels.cache.get(channelId) as TextChannel
  const cantoNum = Math.floor(Math.random() * 12)
  const canto = sb[cantoNum]
  const chapterNum = Math.floor(Math.random() * canto.length)
  const chapter = canto[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  // embed
  const srimadEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(` ${chapter[quoteNum]} \n [Śrīmad-Bhāgavatam ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}](https://vedabase.io/cs/library/sb/${cantoNum + 1}/{chapterNum +1 }/${quoteNum + 1}/)`)
  // output
  channel.send({ embeds: [srimadEmbed] })
}

export default sendRandomSb
