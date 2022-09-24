import ekadashiDates from '../data/other/eka'
import { Client, TextChannel } from 'discord.js'

function ekadashi(client: Client) {
  const channelId = typeof process.env.TESTCHANNELID === "string" ? process.env.TESTCHANNELID : ""
  const channel = client.channels.cache.get(channelId) as TextChannel
}

export default ekadashi
