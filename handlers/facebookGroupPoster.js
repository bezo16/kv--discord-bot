require('dotenv').config()
const axios = require('axios')
const dayjs = require('dayjs')

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const month = monthNames[new Date().getMonth()].toLowerCase()
const day = dayjs().date().toString()
const link = `http://173.212.239.101/img/spb-calendar-fb/${month}/${day}.png`
const url = `https://graph.facebook.com/v13.0/600790771639073/feed?access_token=${process.env.FB_ACCESS_TOKEN_KV_GROUPS}&link=${link}`

async function facebookGroupPoster() {
  await axios.post(url)
}

module.exports = facebookGroupPoster
