const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const Canvas = require('canvas')
const path = require('path')
const dayjs = require('dayjs')
const rkQuotesSb = require('../data/rk-sb')
const rkQuotesBg = require('../data/rk-bg');
const facebookGroupPoster = require('../functions/facebookGroupPoster')
require('dotenv').config()

const appDir = dirname(require.main.filename);
const sb = JSON.parse(fs.readFileSync(`${appDir}/data/sb2.json`));
const bg = JSON.parse(fs.readFileSync(`${appDir}/data/BG-cs.json`));

function dailyQuotes(client) {
  const cooldown = 8 // time in hours for next quote to main chat(pokec)
  const channelID = process.env.MAINCHANNELID // ID of pokec channel

  setInterval(() => {
    // let random = Math.floor(Math.random() * 2)
    const random = 0
    if (random === 1) {
      const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split('.')
      const chapter = Number(selectedQuoteBg[0])
      const quote = Number(selectedQuoteBg[1])

      const gitaEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(bg[chapter - 1][quote - 1])
        .setDescription(`[Bhagavad-Gītā ${chapter}.${quote}](https://vedabase.io/sk/library/bg/${chapter}/${quote}/)`)
      client.channels.cache.get(channelID).send({ embeds: [gitaEmbed] })
    } else {
      const ranQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)]
      const allQuotes = []
      if (typeof (ranQuote) === 'object') {
        for (let i = 0; i < ranQuote.length; i += 1) {
          const cantoNum = Number(ranQuote[i].split('.')[0])
          const chapterNum = Number(ranQuote[i].split('.')[1])
          const quoteNum = Number(ranQuote[i].split('.')[2])
          if (!allQuotes.includes(sb[cantoNum - 1][chapterNum - 1][quoteNum - 1])) {
            allQuotes.push(sb[cantoNum - 1][chapterNum - 1][quoteNum - 1])

            const srimadEmbed = new Discord.MessageEmbed()
              .setColor('#0099ff')
              // .setTitle('Śrīmad-Bhāgavatam')
              .setDescription(`${sb[cantoNum - 1][chapterNum - 1][quoteNum - 1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum}/${quoteNum}/)`)

            client.channels.cache.get(channelID).send({ embeds: [srimadEmbed] })
          }
        }
      } else {
        const selQuote = ranQuote.split('.')
        const cantoNum = Number(selQuote[0])
        const chapterNum = Number(selQuote[1])
        const quoteNum = Number(selQuote[2])

        const srimadEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
        // .setTitle('Śrīmad-Bhāgavatam')
          .setDescription(`${sb[cantoNum - 1][chapterNum - 1][quoteNum - 1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum}/${quoteNum}/)`)

        client.channels.cache.get(channelID).send({ embeds: [srimadEmbed] })
      }
    }
  }, 3600000 * cooldown);

  setInterval(async () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = dayjs()
    const month = monthNames[new Date().getMonth()].toLowerCase()
    const day = date.date().toString()

    if (date.hour() === 6) {
      // facebookGroupPoster(333460573412422)
      const canvas = Canvas.createCanvas(800, 800)
      const ctx = canvas.getContext('2d')
      const imgPath = path.join(__dirname, `../img/spb-calendar/${month}/${day}.png`)

      ctx.fillStyle = 'white' // paint background on white (because its png)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const background = await Canvas.loadImage(imgPath)
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
      const atachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bot-quotes.png')
      client.channels.cache.get(process.env.MAINCHANNELID).send({ files: [atachment] })
    }
  }, 3600000);
}

module.exports = dailyQuotes
