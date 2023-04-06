import { Message } from "discord.js"
import rkQuotesSb from "../../../data/sb/rk-sb"
import findSBQuote from "../../../functions/books/sb/findSbQuote"


const findTopSbQuote = (message: Message) => {
  let selQuote = ""
  while (!selQuote) {
    const quote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)]
    if (typeof (quote) === "string") selQuote = quote
  }
  const [cantoNum, chapterNum, quoteNum] = selQuote.split(".")
  const resultQuote = findSBQuote( `${cantoNum}.${chapterNum}.${quoteNum}`, message)

  return { resultQuote, cantoNum, chapterNum }
}

export default findTopSbQuote