import { test, expect } from '@playwright/test'

test.describe('Login / Logout flow', () => {
  // Befor hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })
  // Negative scenario
  test('Negative scenario for login', async ({ page }) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'invalid username')
    await page.type('#user_password', 'invalid password')
    await page.click('text=Sign in')
  })
  // Positive scenario + Logout
})
