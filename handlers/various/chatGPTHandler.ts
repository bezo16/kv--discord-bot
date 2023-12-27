import { Message } from "discord.js"
import axios from "axios"


async function chatGPTHandler(message: Message) {
  const words = message.content.split(" ")
  const firstWord = words[0]
  const input = words.slice(1).join(" ")

  if (firstWord !== "?chatgpt" || !input) return

  try {
    const response = await axios.post("https://api.openai.com/v1/completions", {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      prompt: input,
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } })
    console.log(response.data.choices)
    message.channel.send(response.data.choices[0].text)
  } catch (err) {
    console.log(err)
    message.channel.send("something went wrong")

    return
  }


}

export default chatGPTHandler