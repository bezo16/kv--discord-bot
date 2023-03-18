import { Message } from "discord.js"
import bg from "../../../data/bg/BG-cs"

const findBgQuote = (quoteString: string, message: Message) => {
  if (!quoteString || !message) return null

  const chapterNum = Number(quoteString.split(".")[0])
  const quoteNum = Number(quoteString.split(".")[1])

  if (!quoteString.match(/^\d+\.\d+$/g)) {
    message.channel.send("wrong regex")

    return
  }

  if (chapterNum < 1 || chapterNum > 18) {
    message.channel.send("wrong chapter number")

    return null
  }

  if (quoteNum < 1 || quoteNum > Number(bg[chapterNum - 1][bg[chapterNum - 1].length - 1].number)) {
    message.channel.send("wrong quote number")

    return null
  }


  const quoteIndex = bg[chapterNum - 1].findIndex(q => {
    if (q.number === String(quoteNum)) return true
    if (q.number.includes("-")) {
      const firstNum = q.number.split("-")[0]
      const secondNum = q.number.split("-")[1]
      if (quoteNum >= Number(firstNum) && quoteNum <= Number(secondNum)) return true
    }
  })
  const resultQuote = bg[chapterNum - 1][quoteIndex]

  return resultQuote
}

export default findBgQuote