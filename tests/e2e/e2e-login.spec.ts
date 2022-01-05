import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel.only('Login / Logout flow', () => {
  let loginPage: LoginPage

  // Befor hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.visit()
  })

  // Negative scenario
  test('Negative scenario for login', async ({ page }) => {
    await page.click('#signin_button')
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.assertErrorMessage()
  })

  // Positive scenario + Logout
  test('Positive scenario for login and logout', async ({ page }) => {
    await page.click('#signin_button')
    await loginPage.login('username', 'password')

    const accountSummaryTab = page.locator('#account_summary_tab')

    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
