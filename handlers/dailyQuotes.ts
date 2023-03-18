import rkQuotesSb from "../data/sb/rk-sb"
import rkQuotesBg from "../data/bg/rk-bg"
import { Client, TextChannel, AttachmentBuilder, EmbedBuilder } from "discord.js"
import Canvas from "canvas"
import dayjs from "dayjs"
import facebookGroupPoster from "../functions/social/facebookGroupPoster"
import sb from "../data/sb/sb"
import bg from "../data/bg/BG-cs"
import path from "path"

function dailyQuotes(client: Client) {
  const cooldown = 16
  const channelID = typeof(process.env.MAINCHANNELID) === "string" ? process.env.MAINCHANNELID : ""
  const channel = client.channels.cache.get(channelID) as TextChannel

  setInterval(() => {
    const random = Math.floor(Math.random() * 2)
    if (random === 1) {
      const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
      const chapter = Number(selectedQuoteBg[0])
      const quote = Number(selectedQuoteBg[1])

      const gitaEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(bg[chapter - 1][quote - 1].text)
        .setDescription(`[Bhagavad-Gītā ${chapter}.${quote}](https://vedabase.io/sk/library/bg/${chapter}/${quote}/)`)
      channel.send({ embeds: [gitaEmbed] })
    } else {
      const ranQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)]
      const allQuotes: string[] = []
      if (typeof (ranQuote) === "object") {
        for (let i = 0; i < ranQuote.length; i += 1) {
          const cantoNum = Number(ranQuote[i].split(".")[0])
          const chapterNum = Number(ranQuote[i].split(".")[1])
          const quoteNum = Number(ranQuote[i].split(".")[2])
          if (!allQuotes.includes(sb[cantoNum - 1][chapterNum - 1][quoteNum - 1].text)) {
            allQuotes.push(sb[cantoNum - 1][chapterNum - 1][quoteNum - 1].text)

            const srimadEmbed = new EmbedBuilder()
              .setColor("#0099ff")
              // .setTitle('Śrīmad-Bhāgavatam')
              .setDescription(`${sb[cantoNum - 1][chapterNum - 1][quoteNum - 1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum}/${quoteNum}/)`)

            channel.send({ embeds: [srimadEmbed] })
          }
        }
      } else {
        const selQuote = ranQuote.split(".")
        const cantoNum = Number(selQuote[0])
        const chapterNum = Number(selQuote[1])
        const quoteNum = Number(selQuote[2])

        const srimadEmbed = new EmbedBuilder()
          .setColor("#0099ff")
        // .setTitle('Śrīmad-Bhāgavatam')
          .setDescription(`${sb[cantoNum - 1][chapterNum - 1][quoteNum - 1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum}/${quoteNum}/)`)

        channel.send({ embeds: [srimadEmbed] })
      }
    }
  }, 3600000 * cooldown)

  setInterval(async () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = dayjs()
    const month = monthNames[new Date().getMonth()].toLowerCase()
    const day = date.date().toString()

    if (date.hour() === 6) {
      facebookGroupPoster("333460573412422")
      const canvas = Canvas.createCanvas(800, 800)
      const ctx = canvas.getContext("2d")
      const imgPath = path.join(__dirname, `../img/spb-calendar/${month}/${day}.png`)

      ctx.fillStyle = "white" // paint background on white (because its png)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const background = await Canvas.loadImage(imgPath)
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
      const atachment = new AttachmentBuilder(canvas.toBuffer(), { name: "bot-quotes.png" })
      channel.send({ files: [atachment] })
    }
  }, 3600000)
}

export default dailyQuotes
