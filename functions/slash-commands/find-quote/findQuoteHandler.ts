import { SlashCommandBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle, ModalActionRowComponentBuilder } from "discord.js"

export const Handler = new SlashCommandBuilder()
  .setName("findquote")
  .setDescription("create custom event")

export const Modal = new ModalBuilder()
  .setCustomId("findQuote")
  .setTitle("Nájdenie veršu z kníh (bg, sb)")

const dateInput = new TextInputBuilder()
  .setCustomId("book")
  .setLabel("nazov knihy (bg, sb)")
  .setStyle(TextInputStyle.Short)

const nameInput = new TextInputBuilder()
  .setCustomId("text")
  .setLabel("vyhladavaci text")
  .setStyle(TextInputStyle.Short)


const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(dateInput)
const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(nameInput)

Modal.addComponents(firstActionRow, secondActionRow)

