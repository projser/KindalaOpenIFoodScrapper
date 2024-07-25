const puppeteer = require('puppeteer')



function  callPuppeteerException(message)  {
    this.message = message;
   
}
    
callPuppeteerException.prototype = Object.create(Error.prototype);

exports.callPuppeteer = async (link,waitUntilParam ='networkidle2') => {
    //'domcontentloaded'

    const minimal_args = [
        '--autoplay-policy=user-gesture-required',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-update',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-domain-reliability',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-notifications',
        '--disable-offer-store-unmasked-wallet-cards',
        '--disable-popup-blocking',
        '--disable-print-preview',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-setuid-sandbox',
        '--disable-speech-api',
        '--disable-sync',
        '--hide-scrollbars',
        '--ignore-gpu-blacklist',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-default-browser-check',
        '--no-first-run',
        '--no-pings',
        '--no-sandbox',
        '--no-zygote',
        '--password-store=basic',
        '--use-gl=swiftshader',
        '--use-mock-keychain',
        '--allow-insecure-localhost',
        ' --disable-sync',
        '--single-process'
        ];

        
    const browser = await puppeteer.launch( { pipe: true , args:minimal_args,waitUntil: waitUntilParam, timeout: 0,headless:false,
   
    args: [
        '--window-size=10,10',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ]
   ,
    ignoreDefaultArgs: ['--disable-extensions'], devtools: false
    });
       
        try {
              console.log(link)
              var [page]  = await  browser.pages();
              await page.goto(link, {waitUntil: waitUntilParam, timeout: 0});

              /*await page
                   .waitForSelector('.categoria.pace-done',{
                        timeout: 6000
                     } )
              

              await page
                    .waitForSelector('.categoria.pace-done',{
                        timeout: 6000
                      } )
              */    
         await page.waitForTimeout({timeout: 20000})


            const pageContent = await page.content();
             
            return pageContent
           
        }
        catch (err) {
            console.log(err)
            throw  new callPuppeteerException('Exception')
        }
        finally{
            
            await browser.close();
        }

}
