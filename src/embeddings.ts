import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {HNSWLib} from "langchain/vectorstores/hnswlib";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {DOC_TYPE, OPENAI_MODEL, TargetDoc} from "@/constants.js";

function getDocLoader(targetDoc: TargetDoc) {
    let docLoader;
    switch (targetDoc.docType) {
        case DOC_TYPE.TEXT: {
            docLoader = new TextLoader(targetDoc.docPath);
            break;
        }
        case DOC_TYPE.PDF: {
            docLoader = new PDFLoader(targetDoc.docPath);
            break;
        }
        default: {
            throw new Error(`Unknown docType ${targetDoc.docType}`);
        }
    }
    return docLoader;
}

export async function generateEmbeddings(targetDoc: TargetDoc,
                                         modelName = OPENAI_MODEL.EMBEDDING_ADA_002,
                                         chunkSize = 1000): Promise<HNSWLib> {
    const docLoader = getDocLoader(targetDoc);
    const textSplitter = new RecursiveCharacterTextSplitter({chunkSize});
    const docs = await textSplitter.splitDocuments(await docLoader.load());
    console.log(`${targetDoc.docName} parsed into #${docs.length} documents`);
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({
        modelName,
    }));
    await vectorStore.save(`data/${targetDoc.docName}`);
    console.log(`embeddings saved to ${targetDoc.docName}`);
    return vectorStore;
}

export async function loadEmbeddings(targetDoc: TargetDoc, modelName = OPENAI_MODEL.EMBEDDING_ADA_002): Promise<HNSWLib> {
    return HNSWLib.load(`data/${targetDoc.docName}`, new OpenAIEmbeddings({
        modelName,
        verbose: true
    }));
}
