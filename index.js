require('dotenv').config()
rkQuotesSb = require('./rk-sb')
 rkQuotesBg = require('./rk-bg')
 const { registerFont, createCanvas } = require('canvas') 
// importy knižnic
const Discord = require('discord.js')
const fetch = require('node-fetch');
const fs = require('fs')
const Canvas = require('canvas')
// config discord knižnice
const client = new Discord.Client()
//

let sb = JSON.parse(fs.readFileSync(__dirname + '/sb2.json'));  // vytiahne data z sb2.json (tam su všetky verše srimadu)
let cc = JSON.parse(fs.readFileSync(__dirname + '/cc.json'));  // vytiahne data z cc.json (tam su všetky verše srimadu)
let miso = JSON.parse(fs.readFileSync(__dirname + '/citaty.json'));  
let bg = JSON.parse(fs.readFileSync(__dirname + '/bg.json'));

sb.forEach(chap => {
    console.log(chap.length)
})
// FONTS 
registerFont('Gabriola.ttf', { family: 'Comic Sans' })


// fetch('https://api.npoint.io/10cbc25e6d2e724ce7c8')  // vytiahne data z internetovej databaze fetch je asynchronny
// .then(res => res.json())
// .then(data =>{   
//                 bg = data})


setInterval(() => {
        // client.channels.cache.get('810552435981680702').send('sb top') 
        let random = Math.floor(Math.random() * 2)  
        let channelID = '810552435981680702'
        if(random === 1) {
            let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
            let chapter = Number(selectedQuoteBg[0])
            let quote = Number(selectedQuoteBg[1])
            console.log(quote,chapter,selectedQuoteBg)

            let gitaEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(bg.bg[chapter - 1][quote - 1].text)
            .setDescription(`[Bhagavad-Gītā ${chapter}.${quote}](https://vedabase.io/sk/library/bg/${chapter}/${quote}/)`)
            client.channels.cache.get(channelID).send(gitaEmbed)
        } else {
            let selQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length )].split('.')
            let cantoNum = Number(selQuote[0])   
            let chapterNum = Number(selQuote[1])
            let quoteNum = Number(selQuote[2])

            let srimadEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
	        // .setTitle('Śrīmad-Bhāgavatam')
	        .setDescription(`${sb[cantoNum -1][chapterNum -1][quoteNum -1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum }/${quoteNum}/)`)

            client.channels.cache.get(channelID).send(srimadEmbed)
        }      
}, 7200000);

client.once('ready',() => {   
    
    
})

client.on('message',message =>{ 


    // funkcie
    async function sendImageQuote(text,quote) {

        let imageUrl
        let textLength = 0
        let resultText = ''
        // let quoteImage = await fetch('https://picsum.photos/600')
        let quoteImage = {url:''}
        let randomNum = Math.floor(Math.random() * 64) + 1
        quoteImage.url =  `./img/bg${randomNum}.jpg` 
        // quoteImage.url =  `./img/kv19.jpg` 
        imageUrl = quoteImage.url
        imageUrl2 = `./img/logo.png`

        const canvas = Canvas.createCanvas(700,700)
        const ctx = canvas.getContext('2d')
        
        const background = await Canvas.loadImage(imageUrl)
        ctx.drawImage(background,0,0,canvas.width,canvas.height)
        
        const background2 = await Canvas.loadImage(imageUrl2)
        let logoWidth = 70
        let logoHeight = 50
        ctx.drawImage(background2,( 350 - (logoWidth / 2)),canvas.height - 85,logoWidth,logoHeight)


        // SIZES  SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES
        console.log('text : ' + text.length)
        let textWidth = null

        // DEFAULT 0 - 100
        ctx.font="54px Gabriola";
        let posY = 160
        let posYChange = 72 
        let charLength = 20

        // 101 - 200
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


        //  SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES END
       
        let splitedText = text.split(' ')
        splitedText.forEach((item,index) =>{
            textLength += item.length
            let splititem = item.split('')
                item = ''
                splititem.forEach(letter => {

                    if(letter === String.fromCharCode(7779)) item += 's'
                    else if(letter === 'ṇ') item += 'n'
                    else if(letter === 'Ṛ') item += 'R'
                    else if(letter === 'ṛ') item += 'r'
                    else if(letter === 'ṭ') item += 't'
                    else if(letter === 'ḍ') item += 'd'
                    else item += letter
                }) 

            if(textLength < charLength) {
                resultText += `${item} `
                if(index === splitedText.length - 1) {
                    console.log('jj')
                    textLength = 0
                    textWidth = ctx.measureText(resultText)
                    ctx.shadowColor="black";
                    ctx.shadowBlur= 5;
                    ctx.lineWidth= 4;
                    ctx.strokeText(resultText,((350) - (textWidth.width / 2)),posY);
                    ctx.shadowBlur=0;
                    ctx.fillStyle="white";
                    ctx.fillText(resultText,((350) - (textWidth.width / 2)),posY);
                    resultText = ''
                    posY += posYChange
                }
            }
            else {
                resultText += `${item} `
                textLength = 0
                textWidth = ctx.measureText(resultText)
                ctx.shadowColor="black";
                ctx.shadowBlur=8;
                ctx.lineWidth=3;
                ctx.strokeText(resultText,((350) - (textWidth.width / 2)),posY);
                ctx.shadowBlur=0;
                ctx.fillStyle="white";
                ctx.fillText(resultText,((350) - (textWidth.width / 2)),posY);
                resultText = ''
                posY += posYChange
            }
        })
        
        
        
        
        
        posY += (posYChange * 0.35)
        ctx.font="30px Gabriola";
        ctx.shadowBlur = 0;
        
        let quoteText = quote
        textWidth = ctx.measureText(quoteText)
        
        ctx.fillText(quoteText,((350) - (textWidth.width / 2)),posY );
        
        
        ctx.font="26px Gabriola";
        ctx.fillStyle = "white";
        let reinText = `@reinkarnacia.sk`
        textWidth = ctx.measureText(reinText)
        ctx.fillText(reinText,((350) - (textWidth.width / 2)),canvas.height - 15 );
        
        const atachment = new Discord.MessageAttachment(canvas.toBuffer(),'welcomebic.png')
        message.channel.send(atachment)
    }

    
    if(message.content.split(" ").length === 2){ 


                          //////////////////////////// BHAGAVAD GITA /////////////////////////////////
                          //////////////////////////// BHAGAVAD GITA /////////////////////////////////
                          //////////////////////////// BHAGAVAD GITA /////////////////////////////////
                          //////////////////////////// BHAGAVAD GITA /////////////////////////////////
                          //////////////////////////// BHAGAVAD GITA /////////////////////////////////
                          //////////////////////////// BHAGAVAD GITA /////////////////////////////////

        let firstWord = message.content.split(" ")[0]  
        let secondWord = message.content.split(" ")[1]  
    if( firstWord.toLowerCase() === 'bg' || firstWord.toLowerCase() === 'bgi') {
        if(secondWord.includes('.')  && secondWord.charAt(0) != '.' && secondWord.charAt(secondWord.length-1) != '.' ){ 
            let splitSecondWord = secondWord.split(".")
            let chapter = splitSecondWord[0]           
            let chapterText = splitSecondWord[1]       
         if(!isNaN(chapterText) && !isNaN(chapter) ){  
             if(chapter < 1 ) chapter = 1                
             if(chapterText < 1 ) chapterText = 1
             if(chapter > 18) chapter = 18
             if(chapterText > bg.bg[chapter-1].length) chapterText = bg.bg[chapter-1].length

             let resultText = bg.bg[chapter-1][chapterText-1].text
             if(firstWord.toLowerCase() === 'bgi') sendImageQuote(resultText, `Bhagavad-Gītā ${chapter}.${chapterText}`) 
             else if(firstWord.toLowerCase() === 'bg') {
                 let gitaEmbed = new Discord.MessageEmbed()
                 .setColor('#0099ff')
	             .setTitle( resultText)
	             .setDescription(`[Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
                 message.channel.send(gitaEmbed)
                }
         }
        }

            if(secondWord === "k"){ 
                message.channel.send("KAPITOLA PRVÁ: Pozorovanie armád na Kuruovskom bojisku\nKAPITOLA DRUHÁ: Zhrnutie obsahu Bhagavad-gīty \nKAPITOLA TRETIA: Karma-yoga \nKAPITOLA ŠTVRTÁ: Transcendentálne poznanie \nKAPITOLA PIATA: Karma-yoga — konanie s mysľou upretou na Kṛṣṇu \nKAPITOLA ŠIESTA: Dhyāna-yoga \nKAPITOLA SIEDMA: Poznanie o Absolútnom \nKAPITOLA ÔSMA: Dosiahnutie Najvyššieho \nKAPITOLA DEVIATA: Najdôvernejšie poznanie \nKAPITOLA DESIATA: Majestát Absolútneho \nKAPITOLA JEDENÁSTA: Vesmírna podoba \nKAPITOLA DVANÁSTA: Oddaná služba \nKAPITOLA TRINÁSTA: Príroda, požívateľ, vedomie \nKAPITOLA ŠTRNÁSTA: Tri kvality hmotnej prírody \nKAPITOLA PÄTNÁSTA: Yoga Najvyššej Osobnosti \nKAPITOLA ŠESTNÁSTA: Božské a démonské povahy \nKAPITOLA SEDEMNÁSTA: Druhy viery \nOSEMNÁSTA KAPITOLA: Dokonalosť odriekania")
            }
            if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'bg'){ 
                chapter = Math.floor(Math.random() * 18);   
                chapterText = Math.floor(Math.random() * bg.bg[chapter].length)
                let resultText = bg.bg[chapter][chapterText].text
                let resultQuote = ` ${chapter +1}.${chapterText +1}`
                let gitaEmbed = new Discord.MessageEmbed()
                 .setColor('#0099ff')
	             .setTitle( resultText)
	             .setDescription(`[Bhagavad-Gītā ${resultQuote}](https://vedabase.io/sk/library/bg/${chapter + 1}/${chapterText + 1}/)`)
                 message.channel.send(gitaEmbed)
            }
            if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'bgi'){ 
                chapter = Math.floor(Math.random() * 18);   
                chapterText = Math.floor(Math.random() * bg.bg[chapter].length)
                let resultText = bg.bg[chapter][chapterText].text
                let resultQuote = `Bhagavad-Gītā ${chapter +1}.${chapterText +1}`
                sendImageQuote(resultText,resultQuote)
            }
            if(secondWord ==='?' && firstWord.toLowerCase() === 'bg'){        
                message.channel.send('bg x.y (x = čislo kapitoly,y = čislo verša) \nbg k (vypis kapitol s popisom každej kapitoly) \nbg r (náhodny verš) \nbg i (info o bhaghavad gite)')
            }
            if(secondWord.toLowerCase() ==='i' && firstWord.toLowerCase() === 'bg'){    
                message.channel.send('Bhagavad gítá je jedna z najvýznamnejších posvätných kníh hinduizmu. Niekedy býva dokonca označovaná za „Bibliu hinduizmu“, pretože ju ako autoritu prijímajú všetky hlavné filozofické tradície (daršany). Obyčajne sa chápe ako samostatná kniha, ale je vlastne súčasťou rozsiahleho staroindického eposu Mahábhárata (konkrétne kapitoly 25-42 knihy Bhíšmaparvan). Je rozdelená na 18 spevov a dohromady má 700 veršov. Jej význam vo vývoji indického myslenia je vskutku veľký. \nhttps://vedabase.io/sk/library/bg/')

            }
            
            if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'bg') {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = selectedQuoteBg[0]
                let quote = selectedQuoteBg[1]
                 message.channel.send(`${bg.bg[chapter -1][quote -1].text}  Bhagavad-Gītā ** ${chapter}.${quote} ** `)
            }

            if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'bgi') {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = selectedQuoteBg[0]
                let quote = selectedQuoteBg[1]
                sendImageQuote(`${bg.bg[chapter -1][quote -1].text}`,`Bhagavad-Gītā ${chapter}.${quote}`)
            }
}



                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////
                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////
                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////
                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////
                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////
                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////
                            ///////////////////////////// SRIMAD BHAGABATAM /////////////////////////////////////////


   if(firstWord.toLowerCase() === 'sb' || firstWord.toLowerCase() === 'sbi') {

       if(secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length -1) !== '.' && secondWord.includes('.')) { 
           let canto = secondWord.split('.')[0]
           let chapter = secondWord.split('.')[1]
           let quote = secondWord.split('.')[2]
           
           if(!isNaN(canto) && !isNaN(chapter) && !isNaN(quote)) { 
               canto = Number(canto)
               chapter = Number(chapter)
               quote = Number(quote)
               if(canto < 1) canto = 1
               if(chapter < 1) chapter = 1
               if(quote < 1) quote = 1
               if(canto > 12) canto = 12
               if(sb[canto -1].length  < chapter) chapter = sb[canto -1].length
               if(sb[canto -1][chapter -1].length  < quote) quote = sb[canto -1][chapter -1].length

               let sendMessageText = sb[canto -1][chapter -1][quote -1]

                if( firstWord.toLowerCase() === 'sb') {
                    let srimadEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
	                .setDescription(` ${sendMessageText} \n [Śrīmad-Bhāgavatam ${canto}.${chapter }.${quote}](https://vedabase.io/cs/library/sb/${canto}/${chapter}/${quote}/)`)
                    message.channel.send(srimadEmbed)
                }
                 else {
                    sendImageQuote(sendMessageText,` Śrīmad-Bhāgavatam ${canto}.${chapter}.${quote}`) 
                }
                }
            }


       if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'sb') { 
           let cantoNum = Math.floor(Math.random() * 12)    
           let canto = sb[cantoNum]
           let chapterNum = Math.floor(Math.random() * canto.length)
           let chapter = canto[chapterNum]
           let quoteNum = Math.floor(Math.random() * chapter.length)
           let srimadEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
	        .setDescription(` ${chapter[quoteNum]} \n [Śrīmad-Bhāgavatam ${cantoNum + 1}.${chapterNum +1}.${quoteNum +1}](https://vedabase.io/cs/library/sb/${cantoNum + 1}/${chapterNum +1 }/${quoteNum + 1}/)`)
            message.channel.send(srimadEmbed)
         }  
         
        if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'sbi') { 
            let cantoNum = Math.floor(Math.random() * 12)    
            let canto = sb[cantoNum]
            let chapterNum = Math.floor(Math.random() * canto.length)
            let chapter = canto[chapterNum]
            let quoteNum = Math.floor(Math.random() * chapter.length)
            sendImageQuote(chapter[quoteNum],` Śrīmad-Bhāgavatam ${cantoNum+1}.${chapterNum+1}.${quoteNum+1}  `)
          }   
          
    
       if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'sb') { 
          let selQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length )].split('.')
          console.log(selQuote)
          let cantoNum = Number(selQuote[0])   
          let chapterNum = Number(selQuote[1])
          let quoteNum = Number(selQuote[2])
          message.channel.send(` Śrīmad-Bhāgavatam ${sb[cantoNum -1][chapterNum -1][quoteNum -1]} ** Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum} **`)
        }

        if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'sbi') { 
            let selQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length )].split('.')
            console.log(selQuote)
            let cantoNum = Number(selQuote[0])   
            let chapterNum = Number(selQuote[1])
            let quoteNum = Number(selQuote[2])
            sendImageQuote(sb[cantoNum -1][chapterNum -1][quoteNum -1],`Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}`)
          }

} 


                            ///////////////////////////// CC  /////////////////////////////////////////
                            ///////////////////////////// CC  /////////////////////////////////////////
                            ///////////////////////////// CC  /////////////////////////////////////////
                            ///////////////////////////// CC  /////////////////////////////////////////
                            ///////////////////////////// CC  /////////////////////////////////////////
                            ///////////////////////////// CC  /////////////////////////////////////////
                     

   if(firstWord.toLowerCase() === 'cc') {
       if(secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length -1) !== '.' && secondWord.includes('.')) { 
           let canto = secondWord.split('.')[0]
           let chapter = secondWord.split('.')[1]
           let quote = secondWord.split('.')[2]
           if(!isNaN(canto) && !isNaN(chapter) && !isNaN(quote)) { 
               if(canto < 1) canto = 1
               if(chapter < 1) chapter = 1
               if(quote < 1) quote = 1
               if(canto > 12) canto = 12
               if(cc[canto -1].length  < chapter) chapter = cc[canto -1].length
               if(cc[canto -1][chapter -1].length  < quote) quote = cc[canto -1][chapter -1].length
                message.channel.send(cc[canto -1][chapter -1][quote -1])
                }
            }
    
       if(secondWord.toLowerCase() === 'r') { 
          let cantoNum = Math.floor(Math.random() * 3)    
          let canto = cc[cantoNum]
          let chapterNum = Math.floor(Math.random() * canto.length)
          let chapter = canto[chapterNum]
          let quoteNum = Math.floor(Math.random() * chapter.length)
          message.channel.send(`${chapter[quoteNum]} ** ${cantoNum+1}.${chapterNum+1}.${quoteNum+1} ** `)
        }
    }
                            ///////////////////////////// mišo  /////////////////////////////////////////
                            ///////////////////////////// mišo  /////////////////////////////////////////
                            ///////////////////////////// mišo  /////////////////////////////////////////
                            ///////////////////////////// mišo  /////////////////////////////////////////
                            ///////////////////////////// mišo  /////////////////////////////////////////
                            ///////////////////////////// mišo  /////////////////////////////////////////
             
   if(firstWord.toLowerCase() === 'miso') {
    
    if(secondWord.toLowerCase() === 'r') { 
       let quote = Math.floor(Math.random() * miso.length) 
       console.log('dlžka is : ' + miso.length)
 
    sendImageQuote(miso[quote].quote,miso[quote].author)
     }
 }               

                      


} 


                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM


                        if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
                            let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
                            let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
                            sendImageQuote(`${text}`,`${book}`)
                            setTimeout(() => {
                                message.delete()
                            }, 2000);
                        }






                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM
                        /////////////////////////// CUSTOM




if( message.author.bot){return;}
})



 client.login(process.env.TOKEN) 