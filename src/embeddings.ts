import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {HNSWLib} from "langchain/vectorstores/hnswlib";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import * as fs from "fs";
import {OPENAI_MODEL} from "@/constants.js";

export async function generateEmbeddings(docName: string, inputFile: string,
                                         modelName = OPENAI_MODEL.EMBEDDING_ADA_002): Promise<HNSWLib> {
    const text = fs.readFileSync(inputFile, "utf8");
    const textSplitter = new RecursiveCharacterTextSplitter({chunkSize: 1000});
    const docs = await textSplitter.createDocuments([text]);
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({
        modelName
    }));
    await vectorStore.save(`data/${docName}`);
    return vectorStore;
}

export async function loadEmbeddings(docName: string, modelName = OPENAI_MODEL.EMBEDDING_ADA_002): Promise<HNSWLib> {
    return HNSWLib.load(`data/${docName}`, new OpenAIEmbeddings({
        modelName
    }));
}

/*
dotenv.config();
const docName = "critter-logistics";
const docPath = "docs/critter-logistics/critter-logistics.txt";
generateEmbeddings(docName, docPath);
*/
