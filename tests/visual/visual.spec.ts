import { test, expect } from '@playwright/test'

test.describe('Visual regression testing example', () => {
  test('Full page snapshot', async ({ page }) => {
    await page.goto('https://example.com')
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })
})
