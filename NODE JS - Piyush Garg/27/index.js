import { Client, Events, GatewayIntentBits } from 'discord.js';
import axios from 'axios';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on("interactionCreate", interaction => {
  interaction.reply("This is a reply to your interaction!");
});

client.on("messageCreate", message => {
  if (message.content === "ping") {
    message.reply("pong");
  }
  if(message.content.startsWith("create")){
    const url = message.content.split(" ")[1];
    axios.post("http://localhost:3000/url", {
      url: url,
    })
    .then(response => {
      const data = response.data;
      message.reply(`Short URL created: http://localhost:3000/s/${data.shortId}`);
    })
    .catch(error => {
      console.error("Error creating short URL:", error);
      message.reply("Failed to create short URL. Please try again.");
    });
    //return message.reply(`Creating a new short url at ${url}`);
  }
  //console.log("Message received:", message.content);
});
const TOKEN = "MTM4NDU5NzQzMjEzODA3MjA3NA.GmiB0a.dTPFWVJUmykdiKTeA5kQbT3wBuZMZFTvPfoUIg";
client.login(TOKEN);