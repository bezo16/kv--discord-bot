import brsm from "../../data/other/brsm"
import type { Message } from "discord.js"


function siHandler(message: Message) {
  if (!message.guild) return


  const messageWords = message.content.split(" ").length
  if (messageWords !== 2) return
  const firstWord = message.content.split(" ")[0]
  if (firstWord !== "?brsm") return
  const secondWord = Number(message.content.split(" ")[1])


  if (isNaN(secondWord)) {
    message.channel.send(`${secondWord} isn't valid number`)

    return // second word isnt number
  }

  if (secondWord <= 0 || secondWord >= 63) {
    message.channel.send(`${secondWord} isnt valid number enter (1-62)`)

    return // second word is number but not valid
  }

  message.channel.send(brsm[secondWord - 1])
}

export default siHandler
