import { test, expect } from '@playwright/test'

test.describe.only('Tips & tricks section', () => {
  test('TestInfo object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    console.log(testInfo.status)
  })
})
