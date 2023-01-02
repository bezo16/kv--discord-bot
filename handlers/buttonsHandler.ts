import quoteButtons from "./buttons/quoteButtons"
import { Message } from "discord.js"

function buttonsHandler(message: Message) {
  if (message.content === "?quote") {
    quoteButtons(message)
  }
}

export default buttonsHandler
