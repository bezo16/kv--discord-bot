import { Client, GatewayIntentBits } from "discord.js"

Client

const clientInit = () => {

    return new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.DirectMessages,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildPresences,
          GatewayIntentBits.MessageContent,
        ]
      })
}

export default clientInit