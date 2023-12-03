// @ts-nocheck
import { CacheType, ChatInputCommandInteraction } from "discord.js";
import findBgQuote from "../../books/bg/findBgQuote";
import createTextEmbed from "../../common/createTextEmbed";

const sendQuoteFunc = async(interaction: ChatInputCommandInteraction<CacheType>) => {

    // Bhagavad Gita
    if (interaction.options.getSubcommand() === "bhagavad-gita") {
        const chapter = interaction.options.getNumber("chapter")
        const verse = interaction.options.getNumber("verse")
        const language = interaction.options.getString("language") as "cz" | "sk" | "en"
        const quote = findBgQuote(`${chapter}.${verse}`, language)
        if (!quote) return interaction.reply(`quote ${chapter}.${verse} does not exist in bhagavad gita`)
        const embed = createTextEmbed({ description: `${quote.text} \n\n[Bhagavad-Gītā ${quote.chapter}.${quote.number}](https://vedabase.io${quote.link})`, title: "Hare Krišna" })
        interaction.reply({ embeds: [embed] })
    }
}

export default sendQuoteFunc