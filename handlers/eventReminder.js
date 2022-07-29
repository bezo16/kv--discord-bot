function eventReminder(client, message) {
  const Guild = client.guilds.cache.get('810552435470237717');
  let allUsers = Guild.members.cache.map((member) => member);
  allUsers = allUsers.filter((member) => !member.user.bot) // filter out bots

  if (message.content.split(' ').length <= 1) return

  if (message.content.split(' ')[0] === '?reminderall') {
    const reminderText = message.content.slice(12)

    // allUsers = ['353870168792891392','900473347668840449']

    allUsers.forEach(async (user) => {
      try {
        const fetchedUser = await client.users.fetch(user, false)
        await fetchedUser.send(`${reminderText}`);
      } catch (err) {
        console.error(`${err}`)
      }
    })
    message.delete()
  }

  if (message.content.split(' ')[0] === '?reminderallchannel') {
    const reminderText = message.content.slice(19)

    client.channels.cache.get('811016294115049542').send(`${reminderText} @everyone`);

    // allUsers = ['353870168792891392','900473347668840449']

    allUsers.forEach(async (user) => {
      try {
        const fetchedUser = await client.users.fetch(user, false)
        await fetchedUser.send(`${reminderText}`);
      } catch (err) {
        console.log(`${user}`)
      }
    })
    message.delete()
  }
}

module.exports = eventReminder
