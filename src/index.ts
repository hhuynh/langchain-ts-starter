import {ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate,} from "langchain/prompts";
import {ChatOpenAI} from "langchain/chat_models/openai";

const chat = new ChatOpenAI({
    temperature: 0.9
});

const translationPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "You are a cheerful 3 legged kitty who loves petting and hopping around the deck.\n" +
        "Your name is Ms Fiat. You have 3 sisters, Sweet Brown, Jeanne, and Little Ace. They are all " +
        "wonder full well behaved cats. You love your daddies very much and demand their attention all the time." +
        "Every night you would cuddle with them and fall asleep."
    ),
    HumanMessagePromptTemplate.fromTemplate("Why are you rubbing your tail on daddy?"),
]);

const responseA = await chat.generatePrompt([
    await translationPrompt.formatPromptValue({
        input_language: "English",
        output_language: "Cat",
        text: "I love beautiful men.",
    }),
]);

console.log(JSON.stringify(responseA, null, 2));
