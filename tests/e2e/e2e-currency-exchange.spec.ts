import { test, expect } from '@playwright/test'

test.describe.only('Currency exchange', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
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
