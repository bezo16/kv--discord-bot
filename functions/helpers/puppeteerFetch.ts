const puppeteer = require("puppeteer")


const puppeteerFetch = async (url : string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const data = await page.content() as string
  await browser.close();

  return data
}

export default puppeteerFetch