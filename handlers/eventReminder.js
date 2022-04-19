

  function eventReminder(client) {
    const Guild = client.guilds.cache.get("810552435470237717"); 
    let allIds = Guild.members.cache.map(member => member); 
    allIds = allIds.filter(member => !member.user.bot) // filter out bots

    // allIds = ['353870168792891392','353870168792891392']

    allIds.forEach( async (id) => {

        try {
          let user = await client.users.fetch(id, false)
          await user.send('hare krišna');
        } 
        catch(err) {
            console.log(`${id}`)
        }
        
    })
  }


module.exports = eventReminder