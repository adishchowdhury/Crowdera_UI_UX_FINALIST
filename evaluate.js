import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const elementHTML = await page.evaluate(() => {
    const el = document.querySelector('div#root:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > button:nth-of-type(1)');
    return el ? el.outerHTML : 'Not found';
  });
  console.log('Landing Screen Match:', elementHTML);
  await browser.close();
})();
