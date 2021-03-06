import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'

test.describe.parallel('Login / Logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  // Befor hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
  })

  // Negative scenario
  test('Negative scenario for login', async ({ page }) => {
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.wait(3000)
    await loginPage.assertErrorMessage()
  })

  // Positive scenario + Logout
  test('Positive scenario for login and logout', async ({ page }) => {
    await loginPage.login('username', 'password')

    const accountSummaryTab = page.locator('#account_summary_tab')

    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
