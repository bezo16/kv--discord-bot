import { SlashCommandBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle, ModalActionRowComponentBuilder } from "discord.js"

export const Handler = new SlashCommandBuilder()
  .setName("createevent")
  .setDescription("create custom event")

export const Modal = new ModalBuilder()
  .setCustomId("eventCreateModal")
  .setTitle("Vytvorenie událosťi")

const dateInput = new TextInputBuilder()
  .setCustomId("date")
  .setLabel("Dátum událosťi")
  .setStyle(TextInputStyle.Short)

const nameInput = new TextInputBuilder()
  .setCustomId("name")
  .setLabel("Názov událosťi")
  .setStyle(TextInputStyle.Short)


const descriptionInput = new TextInputBuilder()
  .setCustomId("desc")
  .setLabel("Popis událosťi")
  .setStyle(TextInputStyle.Paragraph)


const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(dateInput)
const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(nameInput)
const thirdActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(descriptionInput)

Modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)

