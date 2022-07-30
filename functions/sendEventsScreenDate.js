const Discord = require('discord.js')
const puppeteer = require('puppeteer')
const Canvas = require('canvas')
const fs = require('fs')

const fullScreenshot = () => {}

async function sendScreenDate(message, date) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`https://kv-events.netlify.app/?date=20${date.year}-${date.month}-01&st=1`, {
    waitUntil: 'networkidle2'
  });

  await fullScreenshot(page, {
    path: 'foo.png'
  });

  await browser.close();

  const screenshot = await Canvas.loadImage('./foo.png')
  const canvas = Canvas.createCanvas(1200, 1000)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(screenshot, 0, 0, canvas.width, canvas.height)
  const atachment = new Discord.MessageAttachment(canvas.toBuffer(), 'kv-events.png')
  message.channel.send({ files: [atachment] })
  console.warn('send img')
  fs.unlink('./foo.png', () => {})
  console.warn('dele file')
}

module.exports = sendScreenDate
