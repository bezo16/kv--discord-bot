require('dotenv').config()
const axios = require('axios')
const dayjs = require('dayjs')

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

async function facebookGroupPoster(groupId) {
  const month = monthNames[new Date().getMonth()].toLowerCase()
  const day = dayjs().date().toString()
  const link = `http://173.212.239.101/img/spb-calendar-fb/${month}/${day}.jpg`
  const url = `https://graph.facebook.com/v13.0/${groupId}/feed?access_token=${process.env.FB_ACCESS_TOKEN_KV_GROUPS}&link=${link}`
  try {
    await axios.post(url)
  } catch (err) {
    console.log(err)
  }
}

module.exports = facebookGroupPoster
