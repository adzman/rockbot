const { Client, Intents } = require('discord.js');
const fetch = require("node-fetch")
const Database = require("@replit/database");

const db = new Database();
const tenor = process.env['tenor_id']

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const starterRockfacts = [
  "Rock heads or Moai, are carved from volcanic ash.",
  "Archaeolgists believe that the Moai Rock Heads are symbols of authority or power.",
  "The Easter Island moai statues face away from the ocean and towards the villages as if to watch over the people. The exception is the seven Ahu Akivi which face out to sea to help travelers find the island.",
  "When first carved, the surface of the Moai Rock Heads was polished smooth by rubbing with pumice.",
  "At least some of the Moai Rock Heads were painted. One moai in the collection of the Metropolitan Museum of Art was decorated with a reddish pigment.",
  "The Easter Island Rock Head statues were carved by the Polynesian colonizers of the island, mostly between 1250 and 1500.",
  "Each Moai Rock Head presented a status The larger the statue placed upon an ahu (stone platforms), the more mana the chief who commissioned it had.",
  "The more recent Moai Rock Heads had pukao on their heads, which represent the topknot of the chieftains.",
  "Oral traditions suggest that the moai were carved either by a distinguished class of professional carvers who were comparable in status to high-ranking members of other Polynesian craft guilds, or, alternatively, by members of each clan.",
  "Oral histories recount how various people used divine power to command the Rock Head statues to walk"
]

db.get("rockfacts").then(rockfacts => {
  if (!rockfacts || rockfacts.length < 1) {
    db.set("rockfacts", starterRockfacts)
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'rockfact') {
    db.get("rockfacts").then(rockfacts => {
      const rockfact =
        rockfacts[Math.floor(Math.random() * rockfacts.length)]
      interaction.reply(rockfact);
    });

    if (interaction.commandName === 'therock') {
      let keywords = "the rock";
      let url = `https://api.tenor.com/v1/search?q=therock&key=${tenor}&contentfilter=high`;
      let response = await fetch(url);
      let json = await response.json();
      const index = Math.floor(Math.random() * json.results.length);
      interaction.reply(json.results[index].url);
      interaction.reply("GIF from Tenor: " + keywords);
    };
  };
});


const mySecret = process.env['TOKEN']
client.login(mySecret)


