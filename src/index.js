import { map, forEach, filter, take, into } from './lib'

const users = new Map([
  [1, 'John'],
  [2, 'Jan Nils'],
  [3, 'Ruben'],
  [4, 'Heinz'],
  [5, 'Dieter']
])

const chars = 'a😢b🍆c😆'

users
  ::map(([id, user]) => ({ id, user }))
  ::filter(({ id }) => id > 1)
  ::take(2)
  ::forEach((value) => console.log('got value', value))

const mappedChars = chars
  ::map((char) => [char, char.length])
  ::into((iter) => new Map(iter))

console.log(mappedChars)
