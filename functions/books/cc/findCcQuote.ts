import { Message } from "discord.js"
import CC from "../../../data/cc/caitanya-caritamrta"

const findCcQuote = (quoteString: string, message: Message | undefined) => {
  if (!quoteString) return null

  const bookNum = Number(quoteString.split(".")[0])
  const chapterNum = Number(quoteString.split(".")[1])
  const quoteNum = Number(quoteString.split(".")[2])

  if (!quoteString.match(/^\d+\.\d+\.\d+$/g)) {
    message?.channel.send("wrong regex")

    return null
  }

  if (chapterNum < 1 || CC[bookNum - 1].length < chapterNum) {
    message?.channel.send("wrong chapter number")

    return null
  }

  const lastQuote = CC[bookNum - 1][chapterNum - 1][CC[bookNum - 1][chapterNum - 1].length - 1]
  if (quoteNum < 1 ||
    (Number(lastQuote.number.split("-")[lastQuote.number.includes("-") ? 1 : 0]) < quoteNum)) {
    message?.channel.send(`wrong quote number (1-${lastQuote.number.split("-")[lastQuote.number.includes("-") ? 1 : 0]})`)

    return null
  }


  const quoteIndex = CC[bookNum - 1][chapterNum - 1].findIndex(q => {
    if (q.number === String(quoteNum)) return true
    if (q.number.includes("-")) {
      const firstNum = q.number.split("-")[0]
      const secondNum = q.number.split("-")[1]
      if (quoteNum >= Number(firstNum) && quoteNum <= Number(secondNum)) return true
    }
  })
  const resultQuote = CC[bookNum - 1][chapterNum - 1][quoteIndex]

  return resultQuote
}

export default findCcQuote