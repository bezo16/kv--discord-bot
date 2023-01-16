import Cheerio from "cheerio"
import puppeteerFetch from "../scraping/puppeteerFetch"
import dayjs = require("dayjs")
import monthToNumber from "../../utils/date/monthToNumber"

type event = {
    day: string
    month: string
    link: string
    title: string
    desc: string
}


const yogapitEvents = async () => {

  // fetch data
  const data = await puppeteerFetch("https://yogapit.sk/udalosti/")
  const cheerio = Cheerio.load(data)

  // create events array
  const events: event[] = []
  cheerio(".owl-item").each((i, e) => {
    const day = cheerio(".pi-day", e).text()
    const month = cheerio(".pi-month", e).text()
    const title = cheerio(".pi-title", e).text()
    const desc = cheerio(".pi-desc", e).text()
    const link = cheerio(".item-top a", e).attr("href") as string
    events.push({ day, month, link, title, desc })
  })

  // is tomorow event
  let isTomorrowEvent = false
  for (const event of events) {
    const currentYear = dayjs().year()
    const dayDifference = dayjs(`${currentYear}-${monthToNumber(event.month.padStart(2, "0"))}-${event.day.padStart(2, "0")}T10:00:00`).diff(dayjs(), "days")
    if (dayDifference === 0) {
      isTomorrowEvent = true
      break
    }
    else if (dayDifference >= 2) break
  }

  return { events, isTomorrowEvent }
}

export default yogapitEvents