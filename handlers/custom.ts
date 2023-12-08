import vanipediaEssential from "../data/other/vanipedia-essential"
import { Message } from "discord.js"
import randomVanipediaEmbed from "../functions/vanipedia/randomEmbed"
import mantrasText from "../data/other/help-text"

async function custom(message: Message) {

  if (message.content.split(" ")[0] === "?numname" && message.content.split(" ").length >= 3) {
    const nameWords = message.content.split(" ").slice(1)
    let resultNum = 0

    const letters: Record<string, number> = {
      a: 1,
      i: 1,
      j: 1,
      q: 1,
      y: 1,
      b: 2,
      c: 2,
      k: 2,
      r: 2,
      g: 3,
      l: 3,
      s: 3,
      d: 4,
      m: 4,
      t: 4,
      n: 5,
      e: 5,
      u: 6,
      v: 6,
      w: 6,
      x: 6,
      o: 7,
      z: 7,
      f: 8,
      h: 8,
      p: 8,
    }

    let wordNum = 0
    nameWords.forEach(word => {
      wordNum = 0
      word.split("").forEach(letter => {
        wordNum += letters[letter]
      })
      resultNum += wordNum
    })

    while (resultNum >= 10) {
      let sumedNum = 0
      const splitedResultNumArr = resultNum.toString().split("")
      splitedResultNumArr.forEach((num) => sumedNum += Number(num))
      resultNum = sumedNum
    }

    message.channel.send(`result num: ${resultNum}`)
  }

  if (message.content.split(" ")[0] === "?numpsychic" && message.content.split(" ").length === 2) {
    const dateArr = message.content.split(" ")[1].split(".")[0].split("")
    let psychicNum = 0
    dateArr.forEach((n) => psychicNum += Number(n))

    message.channel.send(`psychic num is: ${psychicNum}`)
  }

  if (message.content.split(" ")[0] === "?numdestiny" && message.content.split(" ").length === 2) {
    const dateArr = message.content.split(" ")[1].split(".").join("").split("")
    let destinyNum = 0
    dateArr.forEach((n) => {
      destinyNum += Number(n)
      const destinyNumStr = destinyNum.toString()
      if (destinyNum >= 10) destinyNum = Number(destinyNumStr.split("")[0]) + Number(destinyNumStr.split("")[1])
    })

    message.channel.send(`destiny num is: ${destinyNum}`)
  }
  if (message.content.split(" ")[0] === "?vanipedia" && message.content.split(" ").length >= 2 && message.content.split(" ")[1] !== "r") {
    const category = message.content.trim().split(" ").slice(1).join(" ")
    if (!Object.hasOwnProperty.call(vanipediaEssential, category)) return message.channel.send("invalid category name")
    const randomCategoryNumber = Math.floor(Math.random() * vanipediaEssential[category].length)
    const text = vanipediaEssential[category][randomCategoryNumber]
    message.channel.send(`${text}`)
  }

  if (message.content.split(" ")[0] === "?vanipedia" && message.content.split(" ")[1] === "r") {
    message.channel.send({ embeds: [randomVanipediaEmbed()] })
  }

  if (message.content === "?roll") {
    message.channel.send(String(Math.floor(Math.random() * 100) + 1))
  }

  if (message.content === "?help") {
    message.author.send(mantrasText.books)
    message.author.send(mantrasText.mantras)
    message.author.send(mantrasText.numerology)
    message.author.send(mantrasText.others)
  }

  if (message.content === "?status") message.channel.send({ content: `bot is up and running ${process.env.ENVIROMENT}` })

  if (message.content === "?pes") {
    const msg = await message.channel.send({ content: "hmm" })
    message.channel.send({ content: JSON.stringify(message.author) })
  }

}

export default custom
