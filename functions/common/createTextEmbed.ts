import { EmbedBuilder } from "discord.js"

type Config = {
    title: string
    description: string
    color?: string
}

const createTextEmbed = (config: Config) => {
  const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle(config.title)
    .setDescription(config.description)
    .setColor("#0099ff")

  return embed
}

export default createTextEmbed