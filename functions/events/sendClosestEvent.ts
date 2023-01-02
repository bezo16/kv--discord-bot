import Cheerio from "cheerio"
import puppeteerFetch from "../helpers/puppeteerFetch"
import { Client, TextChannel } from "discord.js"
import dayjs from "dayjs"
import monthToNumber from "../../utils/date/monthToNumber"

type event = {
    day: string
    month: string
    link: string
    title: string
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
    const link = cheerio(".item-top a", e).attr("href") as string
    events.push({ day, month, link, title })
  }) // create events array

  const closestDate = ""
  for (const event of events) {
    const currentYear = dayjs().year
    const isAfter = dayjs().isAfter(dayjs(`${currentYear}-${monthToNumber(event.month)}-${event.day}`))
    if (isAfter) {
      channel.send(`najbližšía udalosť je ${event.title} \n${Number(event.day)} ${event.month}`)

      break
    }
  }

}

export default sendClosestEvent