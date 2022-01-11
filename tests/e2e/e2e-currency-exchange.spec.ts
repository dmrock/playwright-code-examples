import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Currency exchange', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
  })

  test('Should make currency exchange', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click('text=Purchase Foreign Currency')
    await page.selectOption('#pc_currency', 'EUR')

    const rate = page.locator('#sp_sell_rate')
    await expect(rate).toContainText('1 euro (EUR)')
    await page.type('#pc_amount', '100')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')

    const conversionAmount = page.locator('#pc_conversion_amount')
    await expect(conversionAmount).toContainText('100.00 U.S. dollar (USD)')
    await page.click('#purchase_cash')

    const message = page.locator('#alert_content')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'Foreign currency cash was successfully purchased'
    )
  })
})
