import { CacheType, ChatInputCommandInteraction } from "discord.js"
import { Modal as createEventModal } from "../../functions/slash-commands/create-event/createEventHandler"
import { Modal as findQuoteModal } from "../../functions/slash-commands/find-quote/findQuoteHandler"

const slashCommandsHandler = async(interaction: ChatInputCommandInteraction<CacheType>) => {
  if (interaction.commandName === "createevent") interaction.showModal(createEventModal)
  if (interaction.commandName === "findquote") interaction.showModal(findQuoteModal)
}

export default slashCommandsHandler