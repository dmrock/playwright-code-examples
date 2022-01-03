import { test, expect } from '@playwright/test'

test.describe('New payment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')
  })
  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.type('#sp_amount', '5000')
    await page.type('#sp_date', '2022-01-02')
    await page.type('#sp_description', 'Some description')
    await page.click('#pay_saved_payees')

    const message = page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'The payment was successfully submitted'
    )
  })
})
