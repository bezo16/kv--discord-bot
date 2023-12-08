// @ts-nocheckk
import { CacheType, ChatInputCommandInteraction } from "discord.js";
import spDailyQuotesLinks from "../../../data/images/sp_daily_quotes_links";

const sendSpQuoteFunc = async(interaction: ChatInputCommandInteraction<CacheType>) => {
    const imageUrl = spDailyQuotesLinks[Math.floor(Math.random() * spDailyQuotesLinks.length)]

    interaction.reply({ files: [{ attachment: imageUrl }] })
}

export default sendSpQuoteFunc