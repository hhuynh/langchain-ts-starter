import {LLMChain} from "langchain/chains";
import {OpenAI} from "langchain/llms/openai";
import {PromptTemplate} from "langchain/prompts";
import {VectorStoreRetrieverMemory} from "langchain/memory";
import {HoneycodeApiDoc, OPENAI_MODEL} from "@/constants.js";
import {loadEmbeddings} from "@/embeddings.js";

export const run = async () => {
    const model = new OpenAI({
        modelName: OPENAI_MODEL.GPT_3_5_TURBO,
        verbose: true,
        temperature: 0,
        maxConcurrency: 10
    });

    const vectorStore = await loadEmbeddings(HoneycodeApiDoc);

    const memory = new VectorStoreRetrieverMemory({
        vectorStoreRetriever: vectorStore.asRetriever(4),
        memoryKey: "knowledge",
    });

    const prompt =
        PromptTemplate.fromTemplate(`Answer the following questions as best you can. You have access to the following domain knowledge:
        
        {knowledge}
        
        (You do not need to use these pieces of information if not relevant)
        
        Current conversation:
        Human: {input}
        AI:`);

    const chain = new LLMChain({llm: model, prompt, memory});

    const question = "Show sample code to query for rows with Name equals Ted then delete them." +
        "Do not use InvokeScreenAutomation";
    const res = await chain.call({input: question});

    console.log({res});
};
