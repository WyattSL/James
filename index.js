require("dotenv").config({path: "./.env"});
const Discord = require("discord.js");
const client = new Discord.Client();
const embed = Discord.MessageEmbed;
const fs = require("fs");

client.on("ready", () => {
  console.log(`Client logged in as ${client.user.tag}!`);
  loadModules();
});

client.commands = []
client.events = []

async function loadModules() {
  var modules = await fs.readDir("./modules/", {withFileTypes: true});
  var module;
  for (module of modules) {
    var mod = require("./modules/"+module);
    if (mod.module.commands) {
      var i;
      for (i=0;i<mod.modules.commands.length;i++) {
        var c = mod.modules.commands[i];
        client.commands.push(c);
      }
    } else if (mod.modules.events) {
      var i;
      for (i=0;i<mod.modules.events.length;i++) {
        var e = mod.modules.events[i];
        client.events.push(e);
      }
    }
  }
}

var i = 0;
var listeners = [];
for (i=0;i<client.events.length;i++) {
  var event = client.events[i];
  if (!listeners.includes(event.type)) {
    listeners.push(event.type)
    eval(`
      client.on("${event.type}", (a, b, c, d, e, f, g) => {
        var e;
        for (e of client.events) {
          if (e.type == "${event.type}") {
            e.run(client,a,b,c,d,e,f,g)
          }
        }
      });
    `);
  }
}

client.login(process.env.TOKEN)
