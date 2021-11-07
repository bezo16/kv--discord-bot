
function resize(text,ctx,obj) {

    console.log('testujem resize')
    
     // SIZES  SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES

     //  0 - 100
      ctx.font="54px Gabriola";
      obj.posY = 160
      obj.posYChange = 72 
      obj.charLength = 20

     // 101 - 200
     if(text.length > 100 && text.length <= 150 ) {

         ctx.font="54px Gabriola";
         obj.posY = 170
         obj.posYChange = 64 
         obj.charLength = 24
     }

     // 151 - 200
     if(text.length > 150 && text.length <= 200 ) {

         ctx.font="49px Gabriola";
         obj.posY = 120
         obj.posYChange = 59 
         obj.charLength = 24
     }

     // 201 - 350
     if(text.length > 200 && text.length <= 250 ) {

         ctx.font="44px Gabriola";
         obj.posY = 110
         obj.posYChange = 54
         obj.charLength = 25
     }

     // 251 - 300
     if(text.length > 250 && text.length <= 300 ) {

         ctx.font="40px Gabriola";
         obj.posY = 120
         obj.posYChange = 50
         obj.charLength = 26
     }

     // 301 - 400
     if(text.length > 300 && text.length <= 400 ) {

         ctx.font="38px Gabriola";
         obj.posY = 110
         obj.posYChange = 46
         obj.charLength = 30
     }

     // 401 - 500
     if(text.length > 400 && text.length <= 500 ) {

         ctx.font="36px Gabriola";
         obj.posY = 90
         obj.posYChange = 46
         obj.charLength = 44
     }

     // 501 - 600
     if(text.length > 500 && text.length <= 600 ) {

         ctx.font="32px Gabriola";
         obj.posY = 75
         obj.posYChange = 42
         obj.charLength = 42
     }
      
     // 601 - 700
     if(text.length > 600 && text.length <= 700 ) {
     
        ctx.font="30px Gabriola";
        obj.posY = 75
        obj.posYChange = 41
        obj.charLength = 44
     }

     // 1000 - 1100
     if(text.length > 1000 && text.length <= 1100 ) {

         ctx.font="24px Gabriola";
         obj.posY = 85
         obj.posYChange = 35
         obj.charLength = 66
     }

     // 1400 - 1500
     if(text.length > 1400 && text.length <= 1500 ) {

        ctx.font="20px Gabriola";
        obj.posY = 65
        obj.posYChange = 30
        obj.charLength = 72
    }

     //  SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES END
}



module.exports = resize