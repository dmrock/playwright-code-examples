import { test, expect } from '@playwright/test'

test.describe('Tips & tricks section', () => {
  test('TestInfo object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    console.log(testInfo.status)
  })

  test.only('Skip browser', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Feature not implemented')
    await page.goto('https://www.example.com')
  })
})
