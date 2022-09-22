import mantras from '../data/vedicMantras'
import { Message } from 'discord.js'

function vedicMantras(message: Message) {
  const { content } = message
  let allMantras = ''

  if (content === '?mantras') {
    mantras.forEach((mantra, index) => {
      if (mantras.length - 1 === index) allMantras += `${mantra.trigger}`
      else allMantras += `${mantra.trigger},`
    })
    message.channel.send(allMantras)
  }

  mantras.forEach((mantra) => {
    if (mantra.trigger.some((trigger) => `?${trigger}` === content)) message.channel.send(mantra.text)
  })
}

export default vedicMantras
