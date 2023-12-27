import bgHandler from "../books/bgHandler"
import sbHandler from "../books/sbHandler"
import npHandler from "../books/npHandler"
import ccHandler from "../books/ccHandler"
import siHandler from "../books/siHandler"
import brsmHandler from "../books/brsmHandler"
import chatGPTHandler from "../various/chatGPTHandler"
import vedicMantras from "../various/vedicMantras"
import kvEvents from "../various/kvEvents"
import custom from "../various/custom"
import sanskritHandler from "../various/sanskritHandler"
import langChainHandler from "../various/langChainHandler"
import { Client, Message } from "discord.js"
import eventReminder from "../various/eventReminder"


const messageHandler = async (message: Message, client: Client) => {
  message.content = message.content.toLowerCase()
  bgHandler(message)
  sbHandler(message)
  ccHandler(message)
  siHandler(message)
  npHandler(message)
  brsmHandler(message)
  chatGPTHandler(message)
  custom(message)
  vedicMantras(message)
  sanskritHandler(message)
  langChainHandler(message)
  eventReminder(client, message)
  kvEvents(client, message)
}

export default messageHandler