import { ModalSubmitInteraction } from "discord.js"
import BG from "../../../data/bg/BG-cs"
import MiniSearch from "minisearch"


const findQuoteFunc = async(interaction: ModalSubmitInteraction, book: string, text: string ) => {
  book = book.toLowerCase()

  if (book === "sb") {
    await interaction.reply({ content: `je to sb anmo ano`, ephemeral: true })
  }

  else {
    const data = BG.flat(1)
    const miniSearch = new MiniSearch({
      fields: ["number", "link", "text", "chapter"],
      storeFields: ["number", "link", "text", "chapter"],
      idField: "text"
    })

    miniSearch.addAll(data)

    const results = miniSearch.search(text)
    console.log(results)

    if (results.length === 0) {
      await interaction.reply({ content: "verse not found", ephemeral: true })

      return
    }

    const result = results[0]
    await interaction.reply({ content: `${result.text} \n${result.chapter}.${result.number}`, ephemeral: true })
  }

}

export default findQuoteFunc