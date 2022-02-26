import { test, expect } from '@playwright/test'
import { getRandomNumber } from '../../utils/data-helpers'

test.describe('Tips & tricks section', () => {
  test.only('TestInfo object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    // console.log(testInfo.status)
    let newNumber = await getRandomNumber()
    console.log(newNumber)
  })

  test('Skip browser', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Feature not implemented')
    await page.goto('https://www.example.com')
  })

  test('Fixme annotation', async ({ page, browserName }) => {
    test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')
    await page.goto('https://www.example.com')
  })

  const people = ['Mike', 'Jhon', 'Peter', 'Alice', 'Bob']
  for (const name of people) {
    test(`Running test for ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html')
      await page.type('#searchTerm', `${name}`)
      await page.waitForTimeout(3000)
    })
  }

  test('Mouse movement simulation', async ({ page }) => {
    await page.goto('https://www.example.com')
    await page.mouse.move(0, 0)
    await page.mouse.down()
    await page.mouse.move(100, 200)
    await page.mouse.up()
  })

  test('Multiple browser tabs inside one browser', async ({ browser }) => {
    const context = await browser.newContext()
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    const page3 = await context.newPage()
    await page1.goto('https://www.example.com')
    await page2.goto('https://www.example.com')
    await page3.goto('https://www.example.com')
    await page1.waitForTimeout(5000)
  })
})
