import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly payeeSelectBox: Locator
  readonly payeeDetailBtn: Locator
  readonly payeeDetails: Locator
  readonly accountSelectBox: Locator
  readonly amountInput: Locator
  readonly dateInput: Locator
  readonly descrioptionInput: Locator
  readonly submitPaymentBtn: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeSelectBox = page.locator('#sp_payee')
    this.payeeDetailBtn = page.locator('#sp_get_payee_details')
    this.payeeDetails = page.locator('#sp_payee_details')
    this.accountSelectBox = page.locator('#sp_account')
    this.amountInput = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descrioptionInput = page.locator('#sp_description')
    this.submitPaymentBtn = page.locator('#pay_saved_payees')
    this.message = page.locator('#alert_content > span')
  }

  async createPayment() {
    await this.payeeSelectBox.selectOption('apple')
    await this.payeeDetailBtn.click()
    await expect(this.payeeDetails).toBeVisible()
    await this.accountSelectBox.selectOption('6')
    await this.amountInput.type('5000')
    await this.dateInput.type('2022-01-12')
    await this.descrioptionInput.type('Some description')
    await this.submitPaymentBtn.click()
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toContainText(
      'The payment was successfully submitted'
    )
  }
}
