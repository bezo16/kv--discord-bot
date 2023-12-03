import { REST, Routes } from "discord.js"
import { Handler as createEventHandler } from "../../functions/slash-commands/create-event/createEventHandler"
import { Handler as findQuoteHandler} from "../../functions/slash-commands/find-quote/findQuoteHandler"
import { userInfoInit } from "../context-menu/userInfo"
import sendQuoteInit from "../slash-commands/send-quote/sendQuoteInit"

const restInit = async() => {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string)
  const body = [createEventHandler, findQuoteHandler, userInfoInit, sendQuoteInit]
  // if (process.env.ENVIROMENT === "LOCALHOST") body.push({})

  rest.put(
    Routes.applicationGuildCommands("814813554510659594", "810552435470237717"),{ body })
}

export default restInit