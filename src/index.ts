import {OpenAI} from "langchain/llms/openai";
import {ConversationalRetrievalQAChain} from "langchain/chains";
import {loadEmbeddings} from "@/embeddings.js";
import {OPENAI_MODEL} from "@/constants.js";

const docName = "critter-logistics";
const model = new OpenAI({
    modelName: OPENAI_MODEL.GPT_3_5_TURBO,
    verbose: true,
    maxTokens: 1024,
    temperature: 0.5
});
console.log(`model info ${JSON.stringify(model)}`);

const vectorStore = await loadEmbeddings(docName);

const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever()
);

const question = "What can you use when it's too cold?";
const res = await chain.call({question, chat_history: []});
console.log(res);

