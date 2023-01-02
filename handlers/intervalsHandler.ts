import { Client, TextChannel } from "discord.js"
import dayjs from "dayjs"
import sendClosestEvent from "../functions/events/sendClosestEvent"


const intervalsHandler = (client: Client) => {
  const testChannel = client.channels.cache.get(process.env.TESTCHANNELID as string) as TextChannel

  setInterval(() => {
    const hour = dayjs().hour()

    if (hour === 13) {
    //   sendClosestEvent(client, process.env.TESTCHANNELID as string)
    //   testChannel.send("je devad hodin")
    }


  }, 3600000)
}

export default intervalsHandler