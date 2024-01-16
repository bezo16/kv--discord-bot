import { Message } from "discord.js"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Chroma } from "langchain/vectorstores/chroma";
import { config } from "dotenv"
import { OpenAI } from "langchain/llms/openai";
config()


async function langChainHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length < 2) return
  if (!["?lecturesearch",].includes(words[0])) return

  // if (process.env.ENVIROMENT === "VPS") return
  // if (message.author.id !== "353870168792891392") return message.channel.send("only bezo can use this command for now")

  const query = words.slice(1).join(" ")
  
  try {
  const vectorStore = await Chroma.fromExistingCollection(
    new OpenAIEmbeddings(),
    { collectionName: "sp_lectures" }
  );
  console.log(query)

    const response = await vectorStore.similaritySearch(query, 3);
    console.log(response);
  


  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-1106",
    maxTokens: 1000,
    temperature: 0,

  })

  const messageContext = response.map(context => `${context.pageContent}`).join("\n")
  console.log(messageContext)
  const answerLectures = response.map(lecture => `${lecture.metadata?.source.slice(28).slice(0, -4)}`).join("\n\t")

  const res = await model.call(`
  answer only based on context i have provided, if you dont know answer based on that context say: "I dont know"
  context: "${messageContext}"

  question is: "${query}"
  `)
  console.log({ res })


  message.channel.send({ content: `${res} \n\n answers are from lectures:\n\t${answerLectures}` })
  // message.channel.send({ content: "**" + response[0].metadata?.source.slice(28).slice(0, -4) + "**\n\n" + response[0].pageContent })

} catch (e) {
  console.error(e)
  return
}
}

export default langChainHandler