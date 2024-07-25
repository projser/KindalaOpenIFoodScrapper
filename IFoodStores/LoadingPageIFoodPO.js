
var fs = require('fs')
const puppeteer = require('puppeteer-extra');
const selectDetailLink = require('./Database/selectDetailLink').selectDetailLink;
const updateDetailLink = require('./Database/updateDetailLink').updateDetailLink;

os = require('os')

async function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

async function load(url, page) {



  page.on('console', async msg => {
   // await page.evaluate(() => document.body.style.zoom = 0.9  );
    const args = msg.args();
    const vals = [];
    for (let i = 0; i < args.length; i++) {
      vals.push(await args[i].jsonValue());
    }
    console.log(vals.join('\t'));
  });
  await page.goto(url, { timeout: 120000 });
  await page.waitForSelector('#__next',{ timeout: 120000 });
  await page.evaluate(() => {

    const wait = (duration) => {
      console.log('waiting', duration);
      return new Promise(resolve => setTimeout(resolve, duration));
    };

    (async () => {

      window.atBottom = false;
      const scroller = document.documentElement;  // usually what you want to scroll, but not always
      let lastPosition = -1;
      while (!window.atBottom) {
        scroller.scrollTop += 200;
        // scrolling down all at once has pitfalls on some sites: scroller.scrollTop = scroller.scrollHeight;
        await wait(1200);
        const currentPosition = scroller.scrollTop;
        if (currentPosition > lastPosition) {
          console.log('currentPosition', currentPosition);
          lastPosition = currentPosition;
        }
        else {
          window.atBottom = true;
        }
      }
      console.log('Done!');

    })();

  });

  await page.waitForFunction('window.atBottom == true', {
    timeout: 1200000000,
    polling: 1000 // poll for finish every second
  });



};

async function greeting() {
  console.log("Hello World");
}
async function main() {


  let mac = "00:d7:6d:86:b1:a4" //os.networkInterfaces().en0[0].mac
  console.log(mac)
  let store = process.argv[2]
  
  links = await selectDetailLink(process.argv[2], 0)
  //if (!process.argv[3].includes('/Users/'))
   // await deleteFilesinFolderNoStore(process.argv[3])


  console.log(store)
  links = links.map((element) => {
    return element.link;
  });
  id = links.map((element) => {
    return element.id;
  });


  const browser = await puppeteer.launch({
    waitUntil: 'networkidle2', timeout: 12000, headless: false, executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  });

  var [page] = await browser.pages();
  console.log(links.length)
  for (let i = 0; i < links.length; i++) {
    try {
      console.log(links[i],'aqui')
      await load(links[i], page)
      let result = await updateDetailLink(links[i], 1)

      console.log(result);
    }
    catch (msg) {
      console.log(msg)
      process.exit(1)


    }

  }
  await browser.close();
  process.exit(0)


}

main();

