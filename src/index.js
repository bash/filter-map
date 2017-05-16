import { map, forEach, filter, take, into, find } from './lib'
import { range } from './range'

const users = new Map([
  [1, 'John'],
  [2, 'Jan Nils'],
  [3, 'Ruben'],
  [4, 'Heinz'],
  [5, 'Dieter']
])

const chars = 'a😢b🍆c😆'

const generator = function * (n) {
  let value = n

  while (true) {
    yield (value *= n)
  }
}

users
  ::map(([id, user]) => ({ id, user }))
  ::filter(({ id }) => id > 1)
  ::take(2)
  ::forEach((value) => console.log('got value', value))

const mappedChars = chars
  ::map((char) => [char, char.length])
  ::into((iter) => new Map(iter))

console.log(mappedChars)

const numbers = range(1, Infinity)
  ::filter((n) => n % 3 === 0)
  ::map((n) => Math.sqrt(n))
  ::take(3)

numbers::forEach((n) => console.log(`first: ${n}`))
numbers::forEach((n) => console.log(`second: ${n}`))

generator(3)
  ::map((n) => n / 1.5)
  ::take(10)
  ::forEach(::console.log)


console.log(chars::find((char) => char.length > 1))