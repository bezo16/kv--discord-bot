const Discord = require('discord.js')
const puppeteer = require('puppeteer')
const Canvas = require('canvas')
const fs = require('fs')
const fullPageScreenshot = require('../node_modules/fullpage-puppeteer-screenshot/index')

async function sendScreen(message) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://kv-events.netlify.app/?st=1');
  await fullPageScreenshot(page, { path: './foo.png' });
  await browser.close();

  const screenshot = await Canvas.loadImage('./foo.png')
  const canvas = Canvas.createCanvas(1920, 1400)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(screenshot, 0, 0, canvas.width, canvas.height)
  const atachment = new Discord.MessageAttachment(canvas.toBuffer(), 'screenshot.png')
  message.channel.send({ files: [atachment] })
  fs.unlink('./foo.png', () => {})
}

module.exports = sendScreen
