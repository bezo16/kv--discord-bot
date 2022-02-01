const mantras = require('../data/vedicMantras')



    function vedicMantras(message) {
        let content = message.content
        let allMantras = ''

        if(content === '?mantras') {
            mantras.forEach((mantra,index) => {
                if(mantras.length - 1 === index) allMantras += `${mantra.trigger}`
                else allMantras += `${mantra.trigger},`
            })
            message.channel.send(allMantras)
        } 

        mantras.forEach((mantra,index) => {
            if(content === mantra.trigger) message.channel.send(mantra.text)
        })

    }

















    module.exports = vedicMantras