import np from "../data/other/np"
import type { Message } from "discord.js"


function npHandler(message: Message<boolean>) {
  if (!message.guild) return

  const messageWords = message.content.split(" ").length
  if (messageWords !== 2) return
  const firstWord = message.content.split(" ")[0]
  if (firstWord !== "?np") return
  const secondWord = Number(message.content.split(" ")[1])
  console.log(secondWord)


  if (isNaN(secondWord)) {
    message.channel.send(`${secondWord} isn't valid number`)

    return // second word isnt number
  }

  if (secondWord <= 0 || secondWord >= 12) {
    message.channel.send(`${secondWord} isnt valid number enter (1-11)`)

    return // second word is number but not valid
  }

  message.channel.send(np[secondWord - 1])
}

export default npHandler
