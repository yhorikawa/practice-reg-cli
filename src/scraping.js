const puppeteer = require('puppeteer')
const websites = require('../websites.json')

// https://github.com/puppeteer/puppeteer/issues/305#issuecomment-385145048
const autoScroll = async page => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0
      const distance = 100
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  })
}

const screenshot = async (key, dir) => {
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--headless'
    ]
  });
  const page = await browser.newPage();
  page.setViewport({width: 1200, height: 1600});
  await page.goto(websites[key])
  await autoScroll(page)
  await page.screenshot({
    path: `image/${dir}/${key}.png`,
    fullPage: true
  });
  page.waitForTimeout(1000)
  await browser.close()
  console.log(`screenshot ${websites[key]}`)
}

(async () => {
  const dir = process.argv[2] || 'expected'
  for (const key in websites) {
    await screenshot(key, dir);
  }
})();
