import renderer from 'react-test-renderer'
import React from 'react'
import * as Components from '../src/components'

describe('components', () => {
  test('circular-stats', () => {
    const { CircularStats } = Components
    const stats = [
      {
        name: 'a',
        hit: 12,
        miss: 12
      },{
        name: 'b',
        hit: 90,
        miss: 10000
      },{
        name: 'c',
        hit: 20,
        miss: 10
      }
    ]
    const tree = renderer.create(
      <CircularStats stats={stats} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
