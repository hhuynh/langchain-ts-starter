import {LLMChain} from "langchain/chains";
import {OpenAI} from "langchain/llms/openai";
import {PromptTemplate} from "langchain/prompts";
import {VectorStoreRetrieverMemory} from "langchain/memory";
import {NhomThichDuThuDoc, OPENAI_MODEL} from "@/constants.js";
import {loadEmbeddings} from "@/embeddings.js";

export const run = async () => {
    const model = new OpenAI({
        modelName: OPENAI_MODEL.GPT_3_5_TURBO,
        verbose: false,
        temperature: 1,
        maxConcurrency: 10
    });

    /*
    const vectorStore = await generateEmbeddings(NhomThichDuThuDoc, OPENAI_MODEL.EMBEDDING_ADA_002, 200);
     */
    const vectorStore = await loadEmbeddings(NhomThichDuThuDoc);

    const memory = new VectorStoreRetrieverMemory({
        vectorStoreRetriever: vectorStore.asRetriever(4),
        memoryKey: "history",
    });

    const prompt =
        PromptTemplate.fromTemplate(`Answer the following questions as best you can. 
        You have access to the following chat history:
        
        {history}

        Current conversation:
        Human: {input}
        AI answers in vietnamese:`);

    const chain = new LLMChain({llm: model, prompt, memory});

    const question = "Hai Anhem hay khuyên mọi người việc gì?";
    const res = await chain.call({input: question});

    console.log({res});
};

