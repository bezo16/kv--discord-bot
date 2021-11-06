
function resize(text,ctx,posY,posYChange,charLengthc) {
    
    if(text.length > 100 && text.length <= 150 ) {
        
        ctx.font="54px Gabriola";
        posY = 170
        posYChange = 64 
        charLength = 24
    }
    
    // 151 - 200
    if(text.length > 150 && text.length <= 200 ) {
        
        ctx.font="49px Gabriola";
        posY = 120
        posYChange = 59 
        charLength = 24
    }
    
    // 201 - 350
    if(text.length > 200 && text.length <= 250 ) {
        
        ctx.font="44px Gabriola";
        posY = 110
        posYChange = 54
        charLength = 25
    }
    
    // 251 - 300
    if(text.length > 250 && text.length <= 300 ) {
        
        ctx.font="40px Gabriola";
        posY = 120
        posYChange = 50
        charLength = 26
    }
    
    // 301 - 400
    if(text.length > 300 && text.length <= 400 ) {
        
        ctx.font="38px Gabriola";
        posY = 110
        posYChange = 46
        charLength = 30
    }
    
    // 401 - 500
    if(text.length > 400 && text.length <= 500 ) {
        
        ctx.font="36px Gabriola";
        posY = 90
        posYChange = 46
        charLength = 44
    }
    
    // 501 - 600
    if(text.length > 500 && text.length <= 600 ) {
        
        ctx.font="32px Gabriola";
        posY = 75
        posYChange = 42
        charLength = 42
    }

    // 601 - 700
    if(text.length > 600 && text.length <= 700 ) {
        
        ctx.font="30px Gabriola";
        posY = 75
        posYChange = 40
        charLength = 44
    }
    
    // 1000 - 1100
    if(text.length > 1000 && text.length <= 1100 ) {
        
        ctx.font="24px Gabriola";
        posY = 85
        posYChange = 35
        charLength = 66
    }
}