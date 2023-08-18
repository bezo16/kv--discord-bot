import { Message } from "discord.js"
import sanskrit from "../data/other/sanskrit"
import createTextEmbed from "../functions/common/createTextEmbed"


function sanskritHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length !== 2) return
  const [firstWord, secondWord] = words
  if (!["?sanskrit"].includes(firstWord)) return
  const sanskritWords = Object.keys(sanskrit)

  if (firstWord === "?sanskrit" && secondWord === "r") {
    const sanskritIndex = Math.floor(Math.random() * sanskritWords.length)
    const embed = createTextEmbed({description: (sanskrit as any)[sanskritWords[sanskritIndex]], title: sanskritWords[sanskritIndex]})
    message.channel.send({ embeds: [embed] })
  }
}

export default sanskritHandler
