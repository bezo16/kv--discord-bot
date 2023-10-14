import { Message } from "discord.js"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Chroma } from "langchain/vectorstores/chroma";
import { config } from "dotenv"
config()

// const lectureSearch = async(query: string) => {
//   const model = new OpenAI({})
//   const text = fs.readFileSync("data/lectures/sp_lecture.txt", "utf8")
//   const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
//   const docs = await textSplitter.createDocuments([text])

//   // Create a vector store from the documents.
//   const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

//   // Initialize a retriever wrapper around the vector store
//   const vectorStoreRetriever = vectorStore.asRetriever()

//   // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
//   const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever)
//   const res = await chain.call({
//     query,
//   })
//   console.log({ res })

//   return res
// }

async function langChainHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length < 2) return
  if (!["?lecturesearch",].includes(words[0])) return

  // if (message.author.id !== "353870168792891392") return message.channel.send("only bezo can use this command for now")

  const query = words.slice(1).join(" ")

  const vectorStore = await Chroma.fromExistingCollection(
    new OpenAIEmbeddings(),
    { collectionName: "sp_lectures" }
  );
  console.log(query)

  const response = await vectorStore.similaritySearch(query, 3);
  console.log(response);


  message.channel.send({ content: "**" + response[0].metadata.source.slice(28).slice(0, -4) + "**\n\n" + response[0].pageContent })
}

export default langChainHandler
