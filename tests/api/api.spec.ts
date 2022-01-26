import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test.only('Simple API test - assert response status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
  })

  test('Simple API test - assert invalid endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    expect(response.status()).toBe(404)
  })
})
