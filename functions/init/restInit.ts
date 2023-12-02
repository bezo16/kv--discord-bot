import { REST, Routes } from "discord.js"
import { Handler as createEventHandler } from "../../functions/slash-commands/create-event/createEventHandler"
import { Handler as findQuoteHandler} from "../../functions/slash-commands/find-quote/findQuoteHandler"

const restInit = async() => {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string)
rest.put(
  Routes.applicationGuildCommands("814813554510659594", "810552435470237717"),
  { body: [createEventHandler, findQuoteHandler] },
)
}

export default restInit