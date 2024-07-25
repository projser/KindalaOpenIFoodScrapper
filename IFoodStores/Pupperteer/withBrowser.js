
const StealthPlugin = require('puppeteer-extra-plugin-stealth') 
const puppeteer = require('puppeteer-extra') 
puppeteer.use(StealthPlugin()) 
exports.withBrowser = async (fn, headless=false) => {
	const browser = await puppeteer.launch( {executablePath:'/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
	timeout: 12000000,  headless: headless,waitUntil: 'networkidle2', protocolTimeout: 120000000 // 120 seconds
});
	console.log(headless)
	
	try {
		return await fn(browser);
	} finally {
		await browser.close();
	}
}
