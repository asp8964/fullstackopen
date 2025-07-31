const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const titleLocator = page.getByText('log in to application')
    expect(titleLocator).toBeVisible()
    const usernameLocator = page.getByTestId('username')
    expect(usernameLocator).toBeVisible()
    const passwordLocator = page.getByTestId('password')
    expect(passwordLocator).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      //   await page.getByText('Matti Luukkainen logged in').waitFor()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog', 'playwright', 'https://playwright.dev')
      await expect(page.getByText('a blog playwright')).toBeVisible()
    })

    test('the blog can be liked', async ({ page }) => {
      await createBlog(page, 'a blog', 'playwright', 'https://playwright.dev')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('the user who added the blog can delete the blog', async ({
      page,
    }) => {
      page.on('dialog', (dialog) => dialog.accept())
      await createBlog(page, 'a blog', 'playwright', 'https://playwright.dev')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('a blog playwright')).not.toBeVisible()
    })

    test(" only the user who added the blog sees the blog's delete button", async ({
      page,
      request,
    }) => {
      await request.post('/api/users', {
        data: {
          name: 'Test User',
          username: 'test',
          password: 'salainen',
        },
      })

      await createBlog(page, 'a blog', 'playwright', 'https://playwright.dev')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      await loginWith(page, 'test', 'salainen')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(
        page.getByRole('button', { name: 'remove' })
      ).not.toBeVisible()
    })

    test('the blogs sorted by likes', async ({ page }) => {
      //   page.on('dialog', (dialog) => dialog.accept())
      await createBlog(
        page,
        'first blog',
        'playwright',
        'https://playwright.dev'
      )
      await createBlog(
        page,
        'second blog',
        'playwright',
        'https://playwright.dev'
      )
      await createBlog(
        page,
        'third blog',
        'playwright',
        'https://playwright.dev'
      )
      const blogs = page.locator('.content')

      const blog1 = blogs.getByText('first blog playwright')
      await blog1.getByRole('button', { name: 'view' }).click()
      const like1 = blog1.getByRole('button', { name: 'like' })
      await like1.click()
      const likeCount1 = blog1.getByText('likes 1')
      await likeCount1.waitFor()
      expect(likeCount1).toBeVisible()

      const blog2 = blogs.getByText('second blog playwright')
      await blog2.getByRole('button', { name: 'view' }).click()
      const like2 = blog2.getByRole('button', { name: 'like' })
      await like2.click()
      await blog2.getByText('likes 1').waitFor()
      await like2.click()
      await blog2.getByText('likes 2').waitFor()
      await like2.click()
      const likeCount2 = blog2.getByText('likes 3')
      await likeCount2.waitFor()
      expect(likeCount2).toBeVisible()

      const blog3 = blogs.getByText('third blog playwright')
      await blog3.getByRole('button', { name: 'view' }).click()
      const like3 = blog3.getByRole('button', { name: 'like' })
      await like3.click()
      await blog3.getByText('likes 1').waitFor()
      await like3.click()
      await blog3.getByText('likes 2').waitFor()
      await like3.click()
      await blog3.getByText('likes 3').waitFor()
      await like3.click()
      const likeCount3 = blog3.getByText('likes 4')
      await likeCount3.waitFor()
      expect(likeCount3).toBeVisible()

      const newBlogs = page.locator('.content')
      const newBlogs1 = newBlogs.nth(0)
      const newBlogs2 = newBlogs.nth(1)
      const newBlogs3 = newBlogs.nth(2)
      expect(newBlogs1.getByText('likes 4')).toBeVisible()
      expect(newBlogs2.getByText('likes 3')).toBeVisible()
      expect(newBlogs3.getByText('likes 1')).toBeVisible()
    })
  })
})
