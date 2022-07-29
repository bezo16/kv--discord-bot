const Discord = require('discord.js')
const puppeteer = require('puppeteer')
const Canvas = require('canvas')
const fs = require('fs')

const fullScreenshot = () => {}

async function sendScreen(message) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://objective-archimedes-06e9ca.netlify.app/?st=1', {
    waitUntil: 'networkidle2'
  });
  await fullScreenshot(page, {
    path: 'foo.png'
  });

  await browser.close();

  const screenshot = await Canvas.loadImage('./foo.png')
  const canvas = Canvas.createCanvas(1920, 1400)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(screenshot, 0, 0, canvas.width, canvas.height)
  const atachment = new Discord.MessageAttachment(canvas.toBuffer(), 'screenshot.png')
  message.channel.send({ embeds: [atachment] })
  fs.unlink('./foo.png', () => {})
}

async function sendScreenDate(message) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`https://objective-archimedes-06e9ca.netlify.app/?date=20${year}-${month}-01&st=1`, {
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
  const atachment = new Discord.MessageAttachment(canvas.toBuffer(), 'screenshot.png')
  message.channel.send({ embeds: [atachment] })
  fs.unlink('./foo.png', () => {})
}

function kvEvents(message) {
  if (message.content.split(' ').length === 2) {
    const firstWord = message.content.split(' ')[0].toLowerCase()
    const secondWord = message.content.split(' ')[1].toLowerCase()

    if (secondWord.toLowerCase() === 'events' && firstWord.toLowerCase() === 'kv') {
      sendScreen(message)
    }

    if (secondWord.toLowerCase().includes('events') && firstWord.toLowerCase() === 'kv' && !Number.isNaN(secondWord.charAt(6)) && secondWord.length > 6) {
      sendScreenDate(message)
    }
  }
}

module.exports = kvEvents
