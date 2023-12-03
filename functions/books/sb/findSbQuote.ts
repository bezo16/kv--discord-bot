import { Message } from "discord.js"
import sb from "../../../data/sb/sb"

const findSBQuote = (quoteString: string, message?: Message | undefined) => {
  if (!quoteString) return null

  const cantoNum = Number(quoteString.split(".")[0])
  const chapterNum = Number(quoteString.split(".")[1])
  const quoteNum = Number(quoteString.split(".")[2])

  if (!quoteString.match(/^\d+\.\d+\.\d+$/g)) {
    message?.channel.send("wrong regex")

    return null
  }

  if (cantoNum < 1 || cantoNum > 12) {
    message?.channel.send("wrong canto number")

    return null
  }

  if (chapterNum < 1 || sb[cantoNum - 1].length < chapterNum) {
    message?.channel.send("wrong chapter number")

    return null
  }

  if (quoteNum < 1 ||
    (Number(sb[cantoNum - 1][chapterNum - 1][sb[cantoNum - 1][chapterNum - 1].length - 1].number.split("-")[0]) < quoteNum)) {
    message?.channel.send("wrong quote number")

    return null
  }


  const quoteIndex = sb[cantoNum - 1][chapterNum - 1].findIndex(q => {
    if (q.number === String(quoteNum)) return true
    if (q.number.includes("-")) {
      const firstNum = q.number.split("-")[0]
      const secondNum = q.number.split("-")[1]
      if (quoteNum >= Number(firstNum) && quoteNum <= Number(secondNum)) return true
    }
  })
  const resultQuote = sb[cantoNum - 1][chapterNum - 1][quoteIndex]

  return resultQuote
}

export default findSBQuote