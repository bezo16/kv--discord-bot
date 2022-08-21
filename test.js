/* eslint-disable */
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const result = dayjs().to(dayjs('2022-08-08 12:59:00')) // in 31 years

console.log(result)