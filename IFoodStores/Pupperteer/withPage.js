const { timeout } = require('async');
const puppeteer = require('puppeteer')

exports.withPage = (browser) => async (fn) => {
	const page = await browser.newPage({timeout: 30000});
	await page.setJavaScriptEnabled(true)
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
	await page.setViewport({ width: 2950, height: 1850 });
   page.setDefaultNavigationTimeout(1200000); 
/*	page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });
    await page.setRequestInterception(true); */
	
	try {
		return await fn(page);
	} finally {
		await page.close();
	}
}
