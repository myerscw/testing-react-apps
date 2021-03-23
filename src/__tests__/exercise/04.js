// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
// import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

const formBuilder = build('LoginForm', {
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
})

/*
const buildLoginForm = overrides => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  ...overrides,
})
*/

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInput = screen.getByLabelText('Username')
  const passwordInput = screen.getByLabelText('Password')
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  // const {username, password} = buildLoginForm({password: 'testpw'})
  const {username, password} = formBuilder({overrides: {password: 'haha'}})
  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  // 🐨 click on the button with the text "Submit"
  const submit = screen.getByText('Submit')
  userEvent.click(submit)
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
