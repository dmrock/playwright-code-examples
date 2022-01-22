import { test } from '@playwright/test'
import { HomePage } from '../../pages/HomePage'
import { LoginPage } from '../../pages/LoginPage'

test.describe.only('Login page visual test', () => {
  let homepage: HomePage
  let loginpage: LoginPage

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page)
    loginpage = new LoginPage(page)

    await homepage.visit()
    await homepage.clickOnSignIn()
  })

  test('Login form', async ({ page }) => {
    await loginpage.snapshotLoginForm()
  })

  test('Error message', async ({ page }) => {
    await loginpage.login('Fail', 'Some invalid password')
    await loginpage.snapshotErrorMessage()
  })
})
