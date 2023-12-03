import { SlashCommandBuilder } from "discord.js";


const sendQuoteInit = 
  new SlashCommandBuilder()
    .setName('send-quote')
	  .setDescription('Create quote from various vedic scriptures')
    // BG
    .addSubcommand(subcommand => 
      subcommand.setName('bhagavad-gita')
        .setDescription("send quote from bhagavad gita")
        .addNumberOption(option => option.setRequired(true).setDescription("enter chapter").setName("chapter"))
        .addNumberOption(option => option.setRequired(true).setDescription("enter verse").setName("verse"))
        .addStringOption(option => option.setRequired(true).setName("language").setDescription("select language")
          .addChoices(
            { name: 'slovak', value: 'sk' },
				    { name: 'czech', value: 'cz' },
				    { name: 'english', value: 'en' },
          ))
        )
    // SB
    

export default sendQuoteInit