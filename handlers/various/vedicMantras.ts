import mantras from "../../data/other/vedicMantras"
import { Message } from "discord.js"

function vedicMantras(message: Message) {
  const { content } = message
  let allMantras = ""

  if (content === "?mantras") {
    mantras.forEach(mantra => {
      allMantras += `${mantra.trigger[0]} `
    })
    message.channel.send(allMantras.trim())
  }

  mantras.forEach((mantra) => {
    if (mantra.trigger.some((trigger) => `?${trigger}` === content)) message.channel.send(mantra.text)
  })
}

export default vedicMantras
