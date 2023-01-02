import type { CanvasRenderingContext2D } from 'canvas'

type ObjType = {
  posY: number
  posYChange: number
  charLength: number
}

function resize(text: string, ctx: CanvasRenderingContext2D, obj: ObjType) {

  //  0 - 100
  ctx.font = '54px Gabriola';
  obj.posY = 160
  obj.posYChange = 72
  obj.charLength = 20

  // 51 - 100
  if (text.length > 50 && text.length <= 100) {
    ctx.font = '54px Gabriola';
    obj.posY = 180
    obj.posYChange = 68
    obj.charLength = 22
  }

  // 101 - 150
  else if (text.length > 100 && text.length <= 150) {
    ctx.font = '50px Gabriola';
    obj.posY = 140
    obj.posYChange = 61
    obj.charLength = 21
  }

  // 151 - 200
  else if (text.length > 150 && text.length <= 200) {
    ctx.font = '47px Gabriola';
    obj.posY = 105
    obj.posYChange = 58
    obj.charLength = 23
  }

  // 201 - 250
  else if (text.length > 200 && text.length <= 250) {
    ctx.font = '42px Gabriola';
    obj.posY = 125
    obj.posYChange = 55
    obj.charLength = 25
  }

  // 251 - 300
  else if (text.length > 250 && text.length <= 300) {
    ctx.font = '40px Gabriola';
    obj.posY = 105
    obj.posYChange = 50
    obj.charLength = 27
  }

  // 301 - 350
  else if (text.length > 300 && text.length <= 350) {
    ctx.font = '38px Gabriola';
    obj.posY = 105
    obj.posYChange = 50
    obj.charLength = 31
  }

  // 351 - 400
  else if (text.length > 350 && text.length <= 400) {
    ctx.font = '36px Gabriola';
    obj.posY = 115
    obj.posYChange = 48
    obj.charLength = 32
  }

  // 401 - 450
  else if (text.length > 400 && text.length <= 450) {
    ctx.font = '35px Gabriola';
    obj.posY = 80
    obj.posYChange = 46
    obj.charLength = 33
  }

  // 451 - 500
  else if (text.length > 450 && text.length <= 500) {
    ctx.font = '34px Gabriola';
    obj.posY = 80
    obj.posYChange = 46
    obj.charLength = 39
  }

  // 501 - 550
  else if (text.length > 500 && text.length <= 550) {
    ctx.font = '32px Gabriola';
    obj.posY = 85
    obj.posYChange = 45
    obj.charLength = 41
  }

  // 551 - 600
  else if (text.length > 550 && text.length <= 600) {
    ctx.font = '32px Gabriola';
    obj.posY = 70
    obj.posYChange = 44
    obj.charLength = 42
  }

  // 601 - 700
  else if (text.length > 600 && text.length <= 700) {
    ctx.font = '27px Gabriola';
    obj.posY = 75
    obj.posYChange = 38
    obj.charLength = 43
  }

  // 701 - 800
  else if (text.length > 700 && text.length <= 800) {
    ctx.font = '26px Gabriola';
    obj.posY = 70
    obj.posYChange = 37
    obj.charLength = 48
  }

  // 801 - 900
  else if (text.length > 800 && text.length <= 900) {
    ctx.font = '25px Gabriola';
    obj.posY = 75
    obj.posYChange = 36
    obj.charLength = 52
  }

  // 900 - 1000
  else if (text.length > 900 && text.length <= 1000) {
    ctx.font = '24px Gabriola';
    obj.posY = 75
    obj.posYChange = 35
    obj.charLength = 58
  }

  // 1000 - 1100
  else if (text.length > 1000 && text.length <= 1100) {
    ctx.font = '24px Gabriola';
    obj.posY = 85
    obj.posYChange = 35
    obj.charLength = 66
  }

  // 1400 - 1500
  else if (text.length > 1400 && text.length <= 1500) {
    ctx.font = '20px Gabriola';
    obj.posY = 65
    obj.posYChange = 30
    obj.charLength = 72
  }
}

export default resize
