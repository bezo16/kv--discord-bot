import sendScreen from '../functions/events/sendEventsScreen'
import sendScreenDate from '../functions/events/sendEventsScreenDate'
import { Message } from 'discord.js'

function kvEvents(message: Message) {
  if (message.content.split(' ').length !== 2) return
  const firstWord = message.content.split(' ')[0]
  const secondWord = message.content.split(' ')[1]

  if (secondWord === 'events' && firstWord === '?kv') {
    console.warn('hmm')
    sendScreen(message)
  }
  if (secondWord.includes('events') && firstWord === '?kv' && !Number.isNaN(secondWord.charAt(6)) && secondWord.length > 6) {
    const year = secondWord.slice(6, 8)
    const month = secondWord.slice(8)
    sendScreenDate(message, { year, month })
  }
}

export default kvEvents
