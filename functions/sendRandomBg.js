const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const bg = JSON.parse(fs.readFileSync(`${appDir}/data/BG-cs.json`));

function sendRandomBg(client, channelId) {
  // data
  const chapter = Math.floor(Math.random() * 18);
  const chapterText = Math.floor(Math.random() * bg[chapter].length)
  const resultText = bg[chapter][chapterText]
  const resultQuote = ` ${chapter + 1}.${chapterText + 1}`
  // embed
  let gitaEmbed
  if (chapterText.length <= 256) {
    gitaEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(resultText)
      .setDescription(`[Bhagavad-Gītā ${resultQuote}](https://vedabase.io/sk/library/bg/${chapter + 1}/${chapterText + 1}/)`)
  } else {
    gitaEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setDescription(`${resultText} \n[Bhagavad-Gītā ${resultQuote}](https://vedabase.io/sk/library/bg/${chapter + 1}/${chapterText + 1}/)`)
  }
  // output
  client.channels.cache.get(channelId).send({ embeds: [gitaEmbed] })
}

module.exports = sendRandomBg
