require("dotenv").config({path: "./.env"});
const Discord = require("discord.js");
const client = new Discord.Client();
const embed = Discord.MessageEmbed;
const fs = require("fs");

client.on("ready", () => {
  console.log(`Client logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN)
