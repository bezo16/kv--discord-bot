import brsm from "../data/other/brsm"
import type { Message, Client, TextChannel } from "discord.js"


function siHandler(message: Message, client: Client) {
  const { channelId } = message
  if (!message.guild) return
  const channel = message.guild.channels.cache.get(channelId) as TextChannel
  if (!channel) return


  const messageWords = message.content.split(" ").length
  if (messageWords !== 2) return
  const firstWord = message.content.split(" ")[0]
  if (firstWord !== "?brsm") return
  const secondWord = Number(message.content.split(" ")[1])


  if (isNaN(secondWord)) {
    if (!client.channels.cache.get(channelId)) return
    channel.send(`${secondWord} isn't valid number`)

    return // second word isnt number
  }

  if (secondWord <= 0 || secondWord >= 63) {
    channel.send(`${secondWord} isnt valid number enter (1-62)`)

    return // second word is number but not valid
  }

  channel.send(brsm[secondWord - 1])
}

export default siHandler
