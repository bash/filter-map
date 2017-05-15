export function toIterator (value) {
  if (value[Symbol.iterator]) {
    return value[Symbol.iterator]()
  }

  if (typeof value.next === 'function') {
    return value
  }

  throw new Error('value must be an iterator or iterable')
}

const makeIterator = (next) => {
  return {
    next,
    [Symbol.iterator]() {
      return this
    }
  }
}

export function map (mapFn) {
  const iterator = toIterator(this)

  return makeIterator(() => {
    const { done, value } = iterator.next()

    if (done) {
      return { done }
    }

    return { done, value: mapFn(value, value) }
  })
}

export function forEach (callbackFn) {
  const iterator = toIterator(this)

  while (true) {
    const { done, value } = iterator.next()

    if (done) {
      return
    }

    callbackFn(value)
  }
}

export function filter (filterFn) {
  const iterator = toIterator(this)

  return makeIterator(() => {
    while (true) {
      const { done, value } = iterator.next()

      if (done) {
        return { done }
      }

      if (filterFn(value, value)) {
        return { done, value }
      }
    }
  })
}

export function take (take) {
  const iterator = toIterator(this)
  let taken = 0

  return makeIterator(() => {
    const { done, value } = iterator.next()

    if (taken === take) {
      return { done: true }
    }

    taken += 1

    return { done, value }
  })
}

export function into (convertFn) {
  return convertFn(this)
}