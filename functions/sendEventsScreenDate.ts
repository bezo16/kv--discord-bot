// import Discord, { Message } from 'discord.js'
// import puppeteer from 'puppeteer'
// import Canvas from 'canvas'
// import fs from 'fs'
// import fullPageScreenshot from '../node_modules/fullpage-puppeteer-screenshot/index'

// const width = 2100
// const height = 800

// async function sendScreenDate(message: Message, date: any) {
//   const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//   const page = await browser.newPage();
//   await page.setViewport({ width, height });
//   await page.goto(`https://kv-events.netlify.app/?date=20${date.year}-${date.month}-01&st=1`);
//   await fullPageScreenshot(page, { path: './foo.png' });
//   await browser.close();

//   const screenshot = await Canvas.loadImage('./foo.png')
//   const canvas = Canvas.createCanvas(width, height)
//   const ctx = canvas.getContext('2d')
//   ctx.drawImage(screenshot, 0, 0, canvas.width, canvas.height)
//   const atachment = new Discord.MessageAttachment(canvas.toBuffer(), 'kv-events.png')
//   message.channel.send({ files: [atachment] })
//   fs.unlink('./foo.png', () => {})
// }

// export default sendScreenDate
