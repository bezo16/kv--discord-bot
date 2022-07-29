const mantras = require('../data/vedicMantras')

function vedicMantras(message) {
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

module.exports = vedicMantras
