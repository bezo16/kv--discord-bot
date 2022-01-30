const mantras = require('../data/vedicMantras')



    function vedicMantras(message) {
        let content = message.content

        mantras.forEach((mantra,index) => {
            if(content === mantra.trigger) message.channel.send(mantra.text)
        })

    }

















    module.exports = vedicMantras