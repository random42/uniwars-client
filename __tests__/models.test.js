import * as Models from '../src/models'
import { toJS } from 'mobx'
const { User, Chat, Game, Team, Uni, Question } = Models

Models.clearCache = () => {
  User.clearCache()
  Chat.clearCache()
  Game.clearCache()
  Question.clearCache()
  Uni.clearCache()
  Team.clearCache()
}

const TEST_MODELS = [
  [{_id: '0'}, { observable: true }],
  [{_id: '1'}],
  [{_id: '2'}],
  [{_id: '3'}, { cache: false }],
  [{_id: '4'}]
]

const createSomeModels = (_class, models) => models.map(i => new _class(...i))

describe('models', () => {

  beforeEach(Models.clearCache)

  test('constructor-options', () => {
    new User({_id: '0'}, { observable: true })
    new User({_id: '1'})
    new User({_id: '2'}, { cache: true })
    new User({_id: '3'}, { cache: false })
    new User({_id: '4'})
    expect(User.cache.size).toBe(3)
    new Chat({_id: '0'})
    new Chat({_id: '1'}, { observable: true })
    new Chat({_id: '2'}, { cache: false, observable: false})
    new Chat({_id: '3'}, { cache: false })
    expect(Chat.cache.size).toBe(1)
    new Game({_id: '0'}, { cache: false, observable: false })
    new Game({_id: '1'}, { cache: true })
    new Game({_id: '2'})
    new Game({_id: '3'})
    new Game({_id: '4'})
    expect(Game.cache.size).toBe(4)
    new Question({_id: '0'}, { cache: false, observable: true })
    new Question({_id: '1'}, { cache: true })
    new Question({_id: '2'})
    new Question({_id: '3'})
    new Question({_id: '4'})
    expect(Question.cache.size).toBe(1)
    new Team({_id: '0'})
    new Team({_id: '1'})
    new Team({_id: '2'}, { cache: false, observable: true })
    new Team({_id: '3'}, { cache: false })
    new Team({_id: '4'})
    expect(Team.cache.size).toBe(3)
  })

  test('cache-methods', () => {
    let cache = Chat.cache
    let m = createSomeModels(Chat, TEST_MODELS)
    expect(cache.size).toBe(3)
    cache.delete('0')
    cache.delete('4')
    cache.delete('3')
    expect(cache.size).toBe(2)
    cache.set('4', m[4])
    expect(cache.size).toBe(3)
    cache.delete('2')
    expect(cache.size).toBe(2)
  })
})
