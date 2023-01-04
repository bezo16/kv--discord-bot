import { Client, TextChannel, EmbedBuilder } from "discord.js"

type Options = {
    desc: string,
    date: string,
    name: string
}

const createEvent = async (client: Client, channelId: string, options: Options) => {
  const channel = client.channels.cache.get(channelId) as TextChannel

  const closeEventEmbed = new EmbedBuilder()
    .setColor(0x9900FF)
    .setTitle(options.name)
    .setDescription(options.desc)
    .setImage("https://images-ext-1.discordapp.net/external/AFRRhfBm_Yyn-kXW7xuHcmL9Rh6dQBwjGz4oXuzfkOc/https/reinkarnacia.sk/engine/wp-content/uploads/2023/01/yp_oznam-scaled.jpg?width=1440&height=363")

  channel.send({ content: `**Najbližší program - ${options.date}** @everyone`, embeds: [closeEventEmbed] })


}

export default createEvent