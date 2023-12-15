import { SlashCommandBuilder } from "discord.js";


const sendSpQuoteInit = 
  new SlashCommandBuilder()
    .setName('send-sp-quote')
	.setDescription('Send quote from Sri Srimad AC Bhaktivedanta Swami from various categories')
    .addStringOption(option => option.setRequired(true).setName("category").setDescription("select category")
      .addChoices(
        { name: 'daily', value: 'daily' },
        { name: 'srimad bhagavatam', value: 'sb' },
        { name: 'bhagavad gita', value: 'bg' },
      ))
    

export default sendSpQuoteInit