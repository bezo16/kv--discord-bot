import si from "../../data/other/si"
import type { Message } from "discord.js"


function siHandler(message: Message<boolean>) {
  if (!message.guild) return

  const messageWords = message.content.split(" ").length
  if (messageWords !== 2) return
  const firstWord = message.content.split(" ")[0]
  if (firstWord !== "?si") return
  const secondWord = Number(message.content.split(" ")[1])


  if (isNaN(secondWord)) {
    message.channel.send(`${secondWord} isn't valid number`)

    return // second word isnt number
  }

  if (secondWord <= 0 || secondWord >= 19) {
    message.channel.send(`${secondWord} isnt valid number enter (1-18)`)

    return // second word is number but not valid
  }

  message.channel.send(si[secondWord - 1])
}

export default siHandler
