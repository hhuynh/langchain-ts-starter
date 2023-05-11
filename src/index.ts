import {PromptTemplate,} from "langchain/prompts";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {VectorStoreRetrieverMemory} from "langchain/memory";
import {LLMChain, OpenAI} from "langchain";
import {MemoryVectorStore} from "langchain/vectorstores/memory";

const loader = new TextLoader("data/critter-logistics.txt");

const docs = await loader.load();

const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
);

const memory = new VectorStoreRetrieverMemory({
    // 1 is how many documents to return, you might want to return more, eg. 4
    vectorStoreRetriever: vectorStore.asRetriever(1),
    memoryKey: "history",
});

const model = new OpenAI({temperature: 0.9});
const prompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. 
    The AI is talkative and provides lots of specific details from its context. 
    If the AI does not know the answer to a question, it truthfully says it does not know.

Relevant pieces of previous conversation:
{history}

(You do not need to use these pieces of information if not relevant)

Current conversation:
Human: {input}
AI:`);
const chain = new LLMChain({llm: model, prompt, memory});

const res1 = await chain.call({input: "What should I feed Tarzan?"});
console.log({res1});

const res2 = await chain.call({input: "Are the cats allowed to go outside?"});
console.log({res2});
