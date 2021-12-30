import { test, expect } from '@playwright/test'

test.describe('Feedback form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
  })

  test('Reset feedback form', async ({ page }) => {
    await page.type('#name', 'Ivan')
    await page.type('#email', 'test@mail.com')
    await page.type('#subject', 'Isue')
    await page.type('#comment', 'Some comment')
    await page.click('input[name=clear]')

    const nameInput = page.locator('#name')
    const commentInput = page.locator('#comment')

    await expect(nameInput).toBeEmpty()
    await expect(commentInput).toBeEmpty()
  })

  test('Submit reset form', async ({ page }) => {
    await page.type('#name', 'Ivan')
    await page.type('#email', 'test@mail.com')
    await page.type('#subject', 'Isue')
    await page.type('#comment', 'Some comment')
    await page.click('input[name=submit]')
    await page.waitForSelector('#feedback-title')
  })
})
