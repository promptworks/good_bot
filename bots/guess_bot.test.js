const { GuessBot } = require('./guess_bot')

jest.mock('../connection')

class TestBot extends GuessBot {
  handleReward = jest.fn()
  handleExplorationSpace = jest.fn()
}

test('Handles reward message properly', () => {
  const bot = new TestBot()
  const text = `<@TESTID> You got a response reward 10, jump, 90, 100`
  const user = 'GODBOT'

  bot._handleMessage({ text, user })
  expect(bot.handleReward).toBeCalledWith({
    reward: '10',
    guess: 'jump',
    totalScore: '90',
    remaining: '100'
  }, user);
})

test('Handles begin message properly', () => {
  const bot = new TestBot()
  const text = `<@TESTID> Are you ready? begin jump, run, fly`
  const user = 'GODBOT'
  const expectedSpace = ['jump', 'run', 'fly']

  bot._handleMessage({ text, user })
  expect(bot.handleExplorationSpace).toBeCalledWith(expectedSpace, user);
})