import { Message } from "discord.js"
import sanskrit from "../../data/other/sanskrit"
import createTextEmbed from "../../functions/common/createTextEmbed"
import MiniSearch from "minisearch"


async function sanskritHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length < 2) return
  const [firstWord, secondWord] = words
  if (!["?sanskrit"].includes(firstWord)) return
  const sanskritWords = Object.keys(sanskrit)

  if (firstWord === "?sanskrit" && secondWord === "r") {
    const sanskritIndex = Math.floor(Math.random() * sanskritWords.length)
    const embed = createTextEmbed({ description: (sanskrit as any)[sanskritWords[sanskritIndex]], title: sanskritWords[sanskritIndex] })
    message.channel.send({ embeds: [embed] })
  }

  else {
    const searchableArray: any = []
    sanskritWords.forEach(word => {
      if (!word) return
      searchableArray.push({ word, translation: (sanskrit as any)[word], normalizedWord: word.normalize("NFD").replace(/[\u0300-\u036f]/g, "") })
    })
    const miniSearch = new MiniSearch({
      fields: ["normalizedWord", "word"],
      storeFields: ["word", "translation"],
      idField: "word"
    })

    miniSearch.addAll(searchableArray)

    const results = miniSearch.search(message.content.split(" ").slice(1).join(" "))

    if (results.length === 0) {
      await message.reply({ content: "sanskrit not found" })

      return
    }

    const result = results[0]
    const embed = createTextEmbed({ description: result.translation, title: result.word })
    await message.reply({ embeds: [embed] })
  }
}

export default sanskritHandler
