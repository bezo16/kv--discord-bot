import { CacheType, UserContextMenuCommandInteraction } from "discord.js"
import { userInfoFunc } from "../../functions/context-menu/userInfo"

const contextMenuHandler = async(interaction: UserContextMenuCommandInteraction<CacheType>) => {
    if (interaction.commandName === "User Information") userInfoFunc(interaction)
    
}

export default contextMenuHandler