import {loadSummarizationChain} from "langchain/chains";
import {OpenAI} from "langchain/llms/openai";
import {loadEmbeddings} from "@/embeddings.js";
import {MentalHealthWorkplaceDoc, OPENAI_MODEL} from "@/constants.js";

export const run = async () => {
    const model = new OpenAI({
        modelName: OPENAI_MODEL.GPT_3_5_TURBO,
        verbose: true,
        maxTokens: 1024,
        temperature: 0.5
    });

    const vectorStore = await loadEmbeddings(MentalHealthWorkplaceDoc);
    const docs = Array.from(vectorStore.docstore._docs.values());
    console.log(`working with ${docs.length} docs`);

    // This convenience function creates a document chain prompted to summarize a set of documents.
    const chain = loadSummarizationChain(model, { type: "map_reduce" });
    const res = await chain.call({
        input_documents: docs
    });

    console.log({ res });
};

/**
 *   res: {
 *     text: 'The article discusses various strategies for improving mental health in the workplace, including the use of evidence-based practices and the implementation of employee assistance programs. The COVID-19 pandemic has led to a rise in mental health problems among workers, making it more important than ever for employers to address these issues. The Mattingly Award is a tool that can be used to promote a healthy work environment, and there are many other resources available to help companies improve workplace mental health. The article also discusses the importance of addressing workplace stress and promoting a positive work culture to enhance employee well-being.'
 *   }
 */
