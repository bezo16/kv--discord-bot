import rkQuotesBg from "../../data/bg/rk-bg"
import findTopSbQuote from "../../functions/books/sb/findTopSbQuote"
import { Client, TextChannel, AttachmentBuilder, EmbedBuilder } from "discord.js"
import Canvas from "canvas"
import dayjs from "dayjs"
// import facebookGroupPoster from "../functions/social/facebookGroupPoster"
import path from "path"
import nodecron from "node-cron"
import randomVanipediaEmbed from "../../functions/vanipedia/randomEmbed"
import findBgQuote from "../../functions/books/bg/findBgQuote"
import yogapitEvents from "../../functions/scraping/yogapitEvents"
import sendClosestEvent from "../../functions/events/sendClosestEvent"

function cronFunctions(client: Client) {
  const mainChannel = client.channels.cache.get(process.env.MAINCHANNELID as string) as TextChannel
  const philosophyChannel = client.channels.cache.get(process.env.FILOSOPHYCHANNELID as string) as TextChannel

  nodecron.schedule("0 9,12,15,18,21 * * *", () => {
    const random = Math.floor(Math.random() * 2)

    if (random === 0) { // BG --> main channel
      const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
      const chapter = Number(selectedQuoteBg[0])
      const quote = Number(selectedQuoteBg[1])
      const resultQuote = findBgQuote(`${chapter}.${quote}`, "cz")

      const gitaEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(resultQuote!.text)
        .setDescription(`[Bhagavad-Gītā ${chapter}.${resultQuote!.number}](https://vedabase.io${resultQuote!.link})`)
      mainChannel.send({ embeds: [gitaEmbed] })
    }

    else { // SB --> main channel
      const { resultQuote, cantoNum, chapterNum } = findTopSbQuote()
      const srimadEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`${resultQuote!.text} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote?.number}](https://vedabase.io${resultQuote!.link})`)
      mainChannel.send({ embeds: [srimadEmbed] })
    }

  })

  nodecron.schedule("0 8,18 * * *", async() => { // Vanipedia --> philosophy channel
    philosophyChannel.send({ embeds: [randomVanipediaEmbed()] })
  })

  nodecron.schedule("0 6 * * *", async() => { // SP daily quotes
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = dayjs()
    const month = monthNames[new Date().getMonth()].toLowerCase()
    const day = date.date().toString()

    // facebookGroupPoster("333460573412422")
    const canvas = Canvas.createCanvas(800, 800)
    const ctx = canvas.getContext("2d")
    const imgPath = path.join(__dirname, `../data/images/spb-calendar/${month}/${day}.png`)
    ctx.fillStyle = "white" // paint background on white (because its png)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const background = await Canvas.loadImage(imgPath)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    const atachment = new AttachmentBuilder(canvas.toBuffer(), { name: "bot-quotes.png" })
    mainChannel.send({ files: [atachment] })
  })

  nodecron.schedule("0 18 * * *", async () => {
    const { isTomorrowEvent } = await yogapitEvents()
    if (isTomorrowEvent) sendClosestEvent(client, process.env.ANNOUNCEMENTCHANNELID as string, true)
  })

}

export default cronFunctions
