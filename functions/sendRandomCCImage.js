const fs = require('fs')
const { dirname } = require('path');

const appDir = dirname(require.main.filename);
const cc = JSON.parse(fs.readFileSync(`${appDir}/data/cc.json`));
const sendImg = require('./sendImageQuote')

function sendRandomCCImage(client, channelId) {
  const cantoNum = Math.floor(Math.random() * 3)
  const cantoArray = cc[cantoNum]
  const chapterNum = Math.floor(Math.random() * cantoArray.length)
  const chapter = cantoArray[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  sendImg(client, channelId, chapter[quoteNum], `Śrī Caitanya-Caritāmrta ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`)
}

module.exports = sendRandomCCImage
