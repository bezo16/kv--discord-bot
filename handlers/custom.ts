import sendImg from "../functions/canvas/sendImageQuote"
import vanipediaEssential from "../data/other/vanipedia-essential"
import { Message } from "discord.js"
import randomVanipediaEmbed from "../functions/vanipedia/randomEmbed"

function custom(message: Message) {

  if (message.content.split(" ")[0] === "?customquote" && message.content.includes("\"") && message.content.includes("\"") && message.content.includes("{") && message.content.includes("}")) {
    const text = message.content.slice(message.content.indexOf("\"") + 1, message.content.lastIndexOf("\""))
    const book = message.content.slice(message.content.indexOf("{") + 1, message.content.indexOf("}"))
    sendImg(message, `${text}`, `${book}`)
    setTimeout(() => {
      message.delete()
    }, 2000)
  }

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
    const text = `
      **Knihy:**

\t\`?bg 2.2\` - kapitola 2 verš 2
\t\`?bgi 2.2\` - kapitola 2 verš 2 (obrázková verzia)
\t\`?bg r\` - náhodný verš
\t\`?bgi r\` - náhodný verš (obrázková verzia)
\t\`?bg top\` - najviac zaujímave verše
\t\`?bgi top\` - najviac zaujímave verše (obrázková verzia)
\t\`?bg k\` - výpis názvov kapitol

\t\`?sb 2.2.2\` - spev 2 kapitola 2 verš 2
\t\`?sbi 2.2.2\` - spev 2 kapitola 2 verš 2 (obrázková verzia)
\t\`?sb top\` - najviac zaujímave verše
\t\`?sbi top\` - najviac zaujímave verše (obrázková verzia)
\t\`?sb r\` - náhodný verš
\t\`?sbi r\` - náhodný verš (obrázková verzia)

\t\`?cc 2.2.2\` - kniha 2 (madhya-lila) kapitola 2 verš 2
\t\`?cci 2.2.2\` - kniha 2 (madhya-lila) kapitola 2 verš 2 (obrázková verzia)
\t\`?cc r\` - náhodný verš z CC
\t\`?cci r\` - náhodný verš z CC (obrázková verzia)

\t\`?si 2\` - Sri isopanisad - 2 verš

\t\`?np 2\` - Nektár Pokynov - 2 verš

\t\`?brsm 2\` - Brahma Samhita - 2 verš

    **Numerologia:**

\t\`?numname jakub bezak\` - vypočíta numerologicke menné číslo    
\t\`?numpsychic 3.3.2000\` - vypočíta numerologicke psychicke číslo    
\t\`?numdestiny 3.3.2000\` - vypočíta numerologicke osudové číslo    
výpočty robené podla knihy: https://www.pdfdrive.com/numerology-with-tantra-ayurveda-and-astrology-d176038913.html

    **Vanipedia:**

\t\`?vanipedia ability\` - vypíše náhodny citát z kategorie (ability)
zoznam kategorií: https://vanipedia.org/wiki/Category:Essential_Subjects

    **Ostatné:**

\t\`?kv events\` - obrázok udalosti v tomto mesiaci
\t\`?kv events221\` - obrázok udalosti z roku 20(22), januara(1)
\t\`?customquote "fajn fajnovy"{bezo16}\` - vlastný verš, fajn fajnovy - text, bezo16 - autor (obrázková verzia)

\t\`?chatgpt kolko je 2 + 2\` - opytaš sa chatgpt, kolko je 2 + 2

\t\`/createevent\` - vytvori udalost
\t\`/findQuote\` - nájde verš (bg, sb)

`
    message.author.send(text)
  }
}

export default custom
