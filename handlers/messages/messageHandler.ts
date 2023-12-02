import bgHandler from "../../handlers/bgHandler"
import sbHandler from "../../handlers/sbHandler"
import npHandler from "../../handlers/npHandler"
import ccHandler from "../../handlers/ccHandler"
import siHandler from "../../handlers/siHandler"
import brsmHandler from "../../handlers/brsmHandler"
import chatGPTHandler from "../../handlers/chatGPTHandler"
import vedicMantras from "../../handlers/vedicMantras"
import kvEvents from "../../handlers/kvEvents"
import custom from "../../handlers/custom"
import sanskritHandler from "../../handlers/sanskritHandler"
import langChainHandler from "../../handlers/langChainHandler"
import { Client, Message } from "discord.js"
import eventReminder from "../../handlers/eventReminder"


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