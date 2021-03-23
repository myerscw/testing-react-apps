// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {renderHook, act as rhAct} from '@testing-library/react-hooks'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<Counter />)

  // 🐨 get the elements you need using screen
  const countMessage = screen.getByText(/count/i)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  // 🐨 assert on the initial state of the hook

  expect(countMessage).toHaveTextContent(`Count: 0`)
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  userEvent.click(increment)
  expect(countMessage).toHaveTextContent(`Count: 1`)

  userEvent.click(increment)
  expect(countMessage).toHaveTextContent(`Count: 2`)

  userEvent.click(decrement)
  expect(countMessage).toHaveTextContent(`Count: 1`)
})

test('fake component exposes count', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }

  render(<TestComponent />)
  expect(result.count).toBe(0)

  act(result.increment)
  expect(result.count).toBe(1)

  act(result.decrement)
  expect(result.count).toBe(0)
})

/*function setup(props = {}) {
  let result = {}
  function TestComponent() {
    Object.assign(result, useCounter(props))
    return null
  }

  render(<TestComponent />)
  return result
}*/

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 100}))
  expect(result.current.count).toBe(100)

  rhAct(result.current.increment)
  expect(result.current.count).toBe(101)

  rhAct(result.current.decrement)
  expect(result.current.count).toBe(100)
})

test('allows customization of the step', () => {
  const {result} = renderHook(() => useCounter({step: 10}))
  expect(result.current.count).toBe(0)

  rhAct(result.current.increment)
  expect(result.current.count).toBe(10)

  rhAct(result.current.decrement)
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
