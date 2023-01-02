import si from "../data/other/si"
import type { Message, Client, TextChannel } from "discord.js"


function siHandler(message: Message<boolean>, client: Client<boolean>) {
  const { channelId } = message
  if (!message.guild) return
  const channel = message.guild.channels.cache.get(channelId) as TextChannel
  if (!channel) return

  const messageWords = message.content.split(" ").length
  if (messageWords !== 2) return
  const firstWord = message.content.split(" ")[0]
  if (firstWord !== "?si") return
  const secondWord = Number(message.content.split(" ")[1])


  if (isNaN(secondWord)) {
    if (!client.channels.cache.get(channelId)) return
    channel.send(`${secondWord} isn't valid number`)

    return // second word isnt number
  }

  if (secondWord <= 0 || secondWord >= 19) {
    channel.send(`${secondWord} isnt valid number enter (1-18)`)

    return // second word is number but not valid
  }

  channel.send(si[secondWord - 1])
}

export default siHandler
