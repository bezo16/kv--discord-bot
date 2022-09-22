import { MessageActionRow, MessageButton, Message } from 'discord.js'

function quoteButtons(message: Message) {
  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('bg')
        .setLabel('bg')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('bg-img')
        .setLabel('bg-img')
        .setStyle('SUCCESS'),
      new MessageButton()
        .setCustomId('sb')
        .setLabel('sb')
        .setStyle('SUCCESS'),
      new MessageButton()
        .setCustomId('sb-img')
        .setLabel('sb-img')
        .setStyle('SUCCESS'),
      new MessageButton()
        .setCustomId('cc')
        .setLabel('cc')
        .setStyle('SUCCESS'),
    );

  const row2 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('cc-img')
        .setLabel('cc-img')
        .setStyle('SUCCESS'),
    );

  message.channel.send({ components: [row, row2] })
  setTimeout(() => message.delete(), 1000);
}

export default quoteButtons
