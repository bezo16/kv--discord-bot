import { Client } from "discord.js"
import dayjs from "dayjs"
import sendClosestEvent from "../functions/events/sendClosestEvent"
import yogapitEvents from "../functions/scraping/yogapitEvents"


const intervalsHandler = (client: Client) => {

  setInterval(async () => {
    const hour = dayjs().hour()


    if (hour === 18) {
      const { isTomorrowEvent } = await yogapitEvents()
      if (isTomorrowEvent) sendClosestEvent(client, process.env.ANNOUNCEMENTCHANNELID as string, true)
    }


  }, 3600000)
}

export default intervalsHandler