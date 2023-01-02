import Cheerio from "cheerio"
import puppeteerFetch from "../helpers/puppeteerFetch"
import { Client, TextChannel, EmbedBuilder } from "discord.js"
import dayjs from "dayjs"
import monthToNumber from "../../utils/date/monthToNumber"

type event = {
    day: string
    month: string
    link: string
    title: string
    desc: string
}

const sendClosestEvent = async (client: Client, channelId: string) => {
  const channel = client.channels.cache.get(channelId) as TextChannel
  const data = await puppeteerFetch("https://yogapit.sk/udalosti/")
  const cheerio = Cheerio.load(data)

  const events: event[] = []
  cheerio(".owl-item").each((i, e) => {
    const day = cheerio(".pi-day", e).text()
    const month = cheerio(".pi-month", e).text()
    const title = cheerio(".pi-title", e).text()
    const desc = cheerio(".pi-desc", e).text()
    const link = cheerio(".item-top a", e).attr("href") as string
    events.push({ day, month, link, title, desc })
  }) // create events array

  const closestDate = ""
  for (const event of events) {
    const currentYear = dayjs().year()
    const isAfter = dayjs().isBefore(dayjs(`${currentYear}-${monthToNumber(event.month.padStart(2, "0"))}-${event.day.padStart(2, "0")}T10:00:00`))
    const daaysLeft = dayjs(`${currentYear}-${monthToNumber(event.month.padStart(2, "0"))}-${event.day.padStart(2, "0")}T10:00:00`).diff(dayjs(), "days")
    if (isAfter) {
      const closeEventEmbed = new EmbedBuilder()
        .setColor(0x9900FF)
        .setTitle(event.title)
        .setURL(event.link)
        .setDescription(`${Number(event.day)}. ${event.month} \n${event.desc}`)
        .setThumbnail("https://yogapit.sk/wp-content/uploads/2023/01/logo_fialove_event.jpg")

      channel.send({ embeds: [closeEventEmbed] })

      break
    }
  }

}

export default sendClosestEvent