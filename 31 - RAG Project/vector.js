// import OpenAI embeddings
import { OpenAIEmbeddings } from "@langchain/openai"
import dotenv from "dotenv"

dotenv.config()

// create embedding model
const embeddings = new OpenAIEmbeddings({

  // use API key from env
  openAIApiKey: process.env.OPENAI_API_KEY

})

// convert text to vector
const vector = await embeddings.embedQuery("What is RAG?")
console.log(vector.length)
console.log("Vector:")
console.log(vector)