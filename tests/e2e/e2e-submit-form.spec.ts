import { test } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { FeedbackPage } from '../../pages/FeedbackPage'

test.describe('Feedback form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm('Ivan', 'test@mail.com', 'Isue', 'Some comment')
    await feedbackPage.resetForm()
    await feedbackPage.assertReset()
  })

  test('Submit reset form', async ({ page }) => {
    await feedbackPage.fillForm('Ivan', 'test@mail.com', 'Isue', 'Some comment')
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
  })
})
