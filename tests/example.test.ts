import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test.skip('Simple basic test', async ({ page }) => {
  await page.goto('https://example.com')

  const pageTitle = await page.locator('h1')

  await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')

  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.describe('Some test suite', () => {
  test('Working with inputs @myTag', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'wrong_username')
    await page.type('#user_password', 'password')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')

    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Asseetions @myTag', async ({ page }) => {
    await page.goto('https://example.com')

    await expect(page).toHaveURL('https://example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')

    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')

    await expect(nonExistingElement).not.toBeVisible()
  })
})

// The way to run all tests with tag:
// npx playwright test --grep @myTag

// The way to run all tests w/o tag:
// npx playwright test --grep-invert @myTag

test.describe('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/')
  })
  test('Screenshots', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('Single element screenshot', async ({ page }) => {
    const element = page.locator('h1')

    await element.screenshot({ path: 'element_screenshot.png' })
  })
})

test.only('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  await assertTitle(page)
})
