import rkQuotesBg from "../data/bg/rk-bg"
import findTopSbQuote from "../functions/books/sb/findTopSbQuote"
import sendImageQuoteClient from "../functions/canvas/sendImageQuoteClient"
import { Client, TextChannel, AttachmentBuilder, EmbedBuilder } from "discord.js"
import Canvas from "canvas"
import dayjs from "dayjs"
// import facebookGroupPoster from "../functions/social/facebookGroupPoster"
import bg from "../data/bg/BG-cs"
import path from "path"
import nodecron from "node-cron"

function dailyQuotes(client: Client) {
  const mainChannel = client.channels.cache.get(process.env.MAINCHANNELID as string) as TextChannel

  nodecron.schedule("0 9,12,15,18,21 * * *", () => {
    const random = Math.floor(Math.random() * 2)

    if (random === 0) { // BG
      const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
      const chapter = Number(selectedQuoteBg[0])
      const quote = Number(selectedQuoteBg[1])

      const gitaEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(bg[chapter - 1][quote - 1].text)
        .setDescription(`[Bhagavad-Gītā ${chapter}.${quote}](https://vedabase.io/sk/library/bg/${chapter}/${quote}/)`)
      mainChannel.send({ embeds: [gitaEmbed] })
    }

    else { // SB
      const { resultQuote, cantoNum, chapterNum } = findTopSbQuote()
      const srimadEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`${resultQuote!.text} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote?.number}](https://vedabase.io${resultQuote!.link})`)
      mainChannel.send({ embeds: [srimadEmbed] })
    }

  })

  nodecron.schedule("30 10,13,16,19,22 * * *", async() => { // SB top --> philosophy channel
    const { resultQuote, cantoNum, chapterNum } = findTopSbQuote()
    sendImageQuoteClient(client, resultQuote!.text, `[Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote?.number}`, process.env.FILOSOPHYCHANNELID as string)
  })

  nodecron.schedule("0 6 * * *", async() => { // SP daily quotes
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = dayjs()
    const month = monthNames[new Date().getMonth()].toLowerCase()
    const day = date.date().toString()

    // facebookGroupPoster("333460573412422")
    const canvas = Canvas.createCanvas(800, 800)
    const ctx = canvas.getContext("2d")
    const imgPath = path.join(__dirname, `../img/spb-calendar/${month}/${day}.png`)
    ctx.fillStyle = "white" // paint background on white (because its png)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const background = await Canvas.loadImage(imgPath)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    const atachment = new AttachmentBuilder(canvas.toBuffer(), { name: "bot-quotes.png" })
    mainChannel.send({ files: [atachment] })
  })
}

export default dailyQuotes
