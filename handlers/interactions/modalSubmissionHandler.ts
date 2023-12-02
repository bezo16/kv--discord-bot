import { Client, ModalSubmitInteraction } from "discord.js"
import createEvent from "../../functions/slash-commands/create-event/createEvent"
import findQuoteFunc from "../../functions/slash-commands/find-quote/findQuoteFunc"

const modalSubmissionHandler = async(interaction: ModalSubmitInteraction, client: Client) => {
    
    if (interaction.customId === "eventCreateModal") {
        const name = interaction.fields.getTextInputValue("name")
        const desc = interaction.fields.getTextInputValue("desc")
        const date = interaction.fields.getTextInputValue("date")
        createEvent(client, interaction.channelId as string, { name, desc, date } )
        await interaction.reply({ content: "uspešne si vytvoril událosť", ephemeral: true })
    }
    
    if (interaction.customId === "findQuote") {
        const book = interaction.fields.getTextInputValue("book")
        const text = interaction.fields.getTextInputValue("text")
        findQuoteFunc(interaction, book, text)
  }
    }

export default modalSubmissionHandler