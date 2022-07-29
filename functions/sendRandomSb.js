const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const sb = JSON.parse(fs.readFileSync(`${appDir}/data/sb2.json`));

function sendRandomSb(client, channelId) {
  // data
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
  client.channels.cache.get(channelId).send({ embeds: [srimadEmbed] })
}

module.exports = sendRandomSb
