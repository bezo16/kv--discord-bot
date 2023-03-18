import { Client, TextChannel, EmbedBuilder } from "discord.js"
import dayjs from "dayjs"
import monthToNumber from "../date/monthToNumber"
import yogapitEvents from "../scraping/yogapitEvents"

const sendClosestEvent = async (client: Client, channelId: string, everyone: boolean = false) => {
  const channel = client.channels.cache.get(channelId) as TextChannel
  const { events, isTomorrowEvent } = await yogapitEvents()
  console.log(isTomorrowEvent)

  for (const event of events) {
    const currentYear = dayjs().year()
    const isAfter = dayjs().isBefore(dayjs(`${currentYear}-${monthToNumber(event.month.padStart(2, "0"))}-${event.day.padStart(2, "0")}T10:00:00`))
    // const daaysLeft = dayjs(`${currentYear}-${monthToNumber(event.month.padStart(2, "0"))}-${event.day.padStart(2, "0")}T10:00:00`).diff(dayjs(), "days")
    if (isAfter) {
      const closeEventEmbed = new EmbedBuilder()
        .setColor(0x9900FF)
        .setTitle(`${event.title}`)
        .setURL(event.link)
        .setDescription(`${event.desc}`)
        .setImage("https://reinkarnacia.sk/engine/wp-content/uploads/2023/01/yp_udalost-scaled.jpg")

      channel.send({ content: `**Najbližšia udalosť - ${Number(event.day)}. ${event.month}** ${everyone ? "@everyone" : ""}`, embeds: [closeEventEmbed] })

      break
    }
  }

}

export default sendClosestEvent