import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test('Simple API test - assert response status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
  })

  test('Simple API test - assert invalid endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
    expect(response.status()).toBe(404)
  })

  test.only('GET request - get user detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.email).toBeTruthy()
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.last_name).toBe('Bluth')
  })
})
