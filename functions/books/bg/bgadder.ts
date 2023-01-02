import Canvas from "canvas"
import path from "path"
import fs from "fs"

const month = "december"
const url = `/img/spb-calendar/${month}/`
const days = 31

async function bgAdder(num: number) {
  const imgPath = path.join(__dirname, `${url}${num}.png`)
  const canvas = Canvas.createCanvas(800, 800)
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "white" // paint background on white (because its png)
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const background = await Canvas.loadImage(imgPath)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  const buffer = canvas.toBuffer("image/png")
  fs.writeFileSync(`prabhupada/${month}/${num}.jpg`, buffer)
}

for (let i = 1; i <= days; i += 1) {
  console.log(i)
  bgAdder(i)
}
