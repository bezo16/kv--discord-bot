import { ContextMenuCommandBuilder, ApplicationCommandType, CacheType, UserContextMenuCommandInteraction } from "discord.js"

export const userInfoInit = new ContextMenuCommandBuilder()
	.setName("User Information")
	.setType(ApplicationCommandType.User);

export const userInfoFunc = async (interaction: UserContextMenuCommandInteraction<CacheType>) => {
	interaction.reply(`
        username: ${interaction.targetUser.username}
        registered on: ${interaction.targetUser.createdAt}
        `)
}
