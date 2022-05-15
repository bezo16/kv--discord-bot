const quoteButtons = require('./buttons/quoteButtons')



function buttonsHandler(message) {
    if(message.content === '?quote') {
        quoteButtons(message)
    }
}


module.exports = buttonsHandler