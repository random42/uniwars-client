import renderer from 'react-test-renderer'
import React from 'react'

jest.useFakeTimers()

describe('views', () => {
  test('1 + 1 = 2', () => {
    expect(1+1).toBe(2)
  })
})
