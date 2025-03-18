import {test} from "@playwright/test"

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('test suite 1', () => {
    test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
    })

    test ('the first test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test ('navigate to datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('test suite 2', () => {
    test.beforeEach(async ({page}) => {
    await page.getByText('Tables & Data').click()
    })

    test ('the third test', async ({page}) => {
        await page.getByText('Smart Table').click()
    })
    
    test ('the fourth test', async ({page}) => {
        await page.getByText('Tree Grid').click()
    })
})