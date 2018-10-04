import renderer from 'react-test-renderer'
import React from 'react'
import {
  CircularStats,
  GameHeader,
  GameTimer,
  Loading,
  MyInput,
  RankList,
  TextLink,
  SearchInput
} from '../src/components'

jest.useFakeTimers()

describe.skip('components', () => {

  test('circular-stats', () => {
    const props = {
      stats: [
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
    }
    const tree = renderer.create(
      <CircularStats {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('game-header', () => {
    const goku = "https://images.everyeye.it/img-notizie/dragon-ball-super-toyotaro-disegna-goku-ultra-istinto-in-versione-manga-v3-329799-1280x720.jpg"
    const me = "https://avatars2.githubusercontent.com/u/24995370?s=460&v=4"
    const props = {
      left: {
        name: 'Random',
        points: 8,
        picture: me
      },
      right: {
        name: 'Son Goku',
        points: 7,
        picture: goku
      }
    }
    const tree = renderer.create(
      <GameHeader {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('game-timer', () => {
    const props = {
      size: 80,
      initialTime: 10,
      msInterval: 1000,
      startOnMount: true,
      // onTimeEnd: () => 'a',
      // onTimeStart: () => 'b',
      // onPress: () => 'c'
    }
    const tree = renderer.create(
      <GameTimer {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('loading', () => {
    const props = {
    }
    const tree = renderer.create(
      <Loading {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('my-input', () => {
    const props = {
      valid: undefined,
      shake: true,
      placeholder: 'bye'
    }
    const tree = renderer.create(
      <MyInput {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('rank-list', () => {
    const props = {
      data: [
        {
          _id: '1',
          name: 'albero',
          rating: 2542
        },
        {
          _id: '2',
          name: 'ciao',
          rating: 2321
        },
        {
          _id: '3',
          name: 'asd',
          rating: 1233
        }
      ],
      title: "Top players",
      onEndReached: () => {
        console.log('onEndReached')
      },
      linkExtractor: (item) => {
        return { pageKey: 'user', pageProps: { _id: item._id } }
      },
      containerStyle: {
        flex: 1
      }
    }
    const tree = renderer.create(
      <RankList {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('text-link', () => {
    const props = {
      text: 'ciao',
      onPress: () => 'a',
      textStyle: {
        fontSize: 12,
      },
      disabled: false
    }
    const tree = renderer.create(
      <TextLink {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('search-input', () => {
    const props = {
      onChangeText: () => 'a',
      defaultValue: 'asd',
      placeholder: 'bye',
      containerStyle: {
        height: 100,
        width: 50,
        borderWidth: 1,
        borderColor: 'red'
      }
    }
    const tree = renderer.create(
      <SearchInput {...props} />
    )
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
