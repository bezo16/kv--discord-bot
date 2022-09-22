import Discord, { Client, TextChannel } from 'discord.js'
import bg from '../data/BG-cs'

function sendRandomBg(client: Client, channelId: string) {
  // data
  const channel = client.channels.cache.get(channelId) as TextChannel
  const chapter = Math.floor(Math.random() * 18);
  const chapterNum = Math.floor(Math.random() * bg[chapter].length)
  const resultText = bg[chapter][chapterNum]
  const resultQuote = ` ${chapter + 1}.${chapterNum + 1}`
  // embed
  let gitaEmbed
  if (resultText.length <= 256) {
    gitaEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(resultText)
      .setDescription(`[Bhagavad-Gītā ${resultQuote}](https://vedabase.io/sk/library/bg/${chapter + 1}/${chapterNum + 1}/)`)
  } else {
    gitaEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setDescription(`${resultText} \n[Bhagavad-Gītā ${resultQuote}](https://vedabase.io/sk/library/bg/${chapter + 1}/${chapterNum + 1}/)`)
  }
  // output
  channel.send({ embeds: [gitaEmbed] })
}

export default sendRandomBg
