import { ActionRowBuilder, ButtonBuilder, Message, ButtonStyle } from 'discord.js'

function quoteButtons(message: Message) {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('bg')
        .setLabel('bg')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('bg-img')
        .setLabel('bg-img')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('sb')
        .setLabel('sb')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('sb-img')
        .setLabel('sb-img')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('cc')
        .setLabel('cc')
        .setStyle(ButtonStyle.Success),
    )

  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('cc-img')
        .setLabel('cc-img')
        .setStyle(ButtonStyle.Success),
    )

  // message.channel.send({ content: "some cool buttons", components: [row, row2] })
  setTimeout(() => message.delete(), 1000)
}

export default quoteButtons
