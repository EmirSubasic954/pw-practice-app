import {test, expect} from "@playwright/test"

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rules', async ({page}) =>{

// by Tag name

page.locator('button').first().click()

// by ID

await page.locator('#exampleInputPassword1').click()

// by class value

await page.locator('.shape-rectangle').first().click()

// by attribute

page.locator('[type="submit"]')

// by class value(full)

page.locator('[class="appearance-filled size-medium shape-rectangle status-primary nb-transition"]')

// combine different selectors

page.locator('button[type="submit"]')

// partial text 

page.locator(':text=("Inline")')


// full text

await page.locator(':text-is("Form without labels")').click()

})


test('User facing locators', async({page}) => {

await page.getByRole('textbox', {name: 'Password'}).first().click()
await page.getByRole('button', {name: 'Sign in'}).first().click()
await page.getByRole('button', {name: 'Send'}).click()


await page.getByLabel('Password').first().click()
await page.getByLabel('Email address').first().click()
await page.getByLabel('Last name').click()

await page.getByPlaceholder('Recipients').click()
await page.getByPlaceholder('Website').click()

await page.getByText('Horizontal form').click()

await page.getByTitle('Modal & Overlays').click()

})

test('Locating child elements', async({page}) => {

await page.locator('nb-card nb-checkbox :text-is("Check me out")').click()

await page.locator('nb-card').getByRole('button', {name: 'Send'}).click()
await page.locator('nb-card').getByRole('checkbox', {name: 'Check me out'}).check()

})

test('Locating parent elemenrs', async({page}) => {

await page.locator('nb-card', {hasText: 'Horizontal form'}).getByRole('button', {name: 'Sign in'}).click()
await page.locator('nb-card', {has: page.locator('#inputEmail3')}).getByRole('textbox', {name: 'Password'}).click()

//filter method

await page.locator('nb-card').filter({hasText: 'Block form'}).getByRole('textbox', {name: 'Email'}).click()
await page.locator('nb-card').filter({has: page.locator('.status-warning')}).getByRole('textbox', {name: 'Email'}).click()

//multiple filters

await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Check me out'}).getByRole('textbox', {name: 'Email'}).click()
})


test('Reusing the locators', async({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const passField = basicForm.getByRole('textbox', {name: 'Password'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})

    await  emailField.fill('test@test.com')
    await passField.fill('Test123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

})


test('Extracting values', async({page}) => {

// single text value 

const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
const buttonText = await basicForm.locator('button').textContent()

expect(buttonText).toEqual('Submit')

// all text values

const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
expect(allRadioButtonsLabels).toContain('Disabled Option')

// input value

const emailField = basicForm.getByRole('textbox', {name: 'Email'})
await emailField.fill('test@test.com')
const emailValue = await emailField.inputValue()
expect(emailValue).toEqual('test@test.com')

// attribute value

const placeholderValue = await basicForm.getByRole('textbox', {name: 'Password'}).getAttribute('placeholder')
expect(placeholderValue).toEqual('Password')
})



test('Assertions', async({page}) => {

    const signInButton = page.locator('nb-card', {hasText: 'Horizontal form'}).locator('button')

// General assertions

const value = 5
expect(value).toEqual(5)

const textButton = await signInButton.textContent()
expect(textButton).toEqual('Sign in')


// Locator assertion

await expect(signInButton).toHaveText('Sign in')

// Soft assertion

await expect.soft(signInButton).toHaveText('Sign in')
await signInButton.click()


})