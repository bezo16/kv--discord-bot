// @ts-nocheck
import { CacheType, ChatInputCommandInteraction } from "discord.js";
import spDailyQuotesLinks from "../../../data/images/sp_daily_quotes_links";
import spSBQuotesLinks from "../../../data/images/sp_photos_srimad_bhagavatam";

const sendSpQuoteFunc = async(interaction: ChatInputCommandInteraction<CacheType>) => {
    const category = interaction.options.getString("category") as "daily" | "sb"
    
    let imageUrl = ""
    if (category === "daily") imageUrl = spDailyQuotesLinks[Math.floor(Math.random() * spDailyQuotesLinks.length)]
    if (category === "sb") imageUrl = spSBQuotesLinks[Math.floor(Math.random() * spSBQuotesLinks.length)]



    imageUrl ? interaction.reply({ files: [{ attachment: imageUrl }] }) : interaction.reply("something went wrong")
}

export default sendSpQuoteFunc