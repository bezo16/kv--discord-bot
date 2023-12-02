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
        )
    // SB
    

export default sendQuoteInit