export function iterator (value) {
  if (value[Symbol.iterator]) {
    return value[Symbol.iterator]()
  }

  if (typeof value.next === 'function') {
    return value
  }

  throw new Error('value must be an iterator or iterable')
}

const iterable = (makeIterator) => {
  return {
    [Symbol.iterator]: makeIterator
  }
}

export function map (mapFn) {
  return iterable(() => {
    const source = iterator(this)

    return {
      next: () => {
        const { done, value } = source.next()

        if (done) {
          return { done }
        }

        return { done, value: mapFn(value, value) }
      }
    }
  })
}

export function forEach (callbackFn) {
  const source = iterator(this)

  while (true) {
    const { done, value } = source.next()

    if (done) {
      return
    }

    callbackFn(value)
  }
}

export function filter (filterFn) {
  return iterable(() => {
    const source = iterator(this)

    return {
      next: () => {
        while (true) {
          const { done, value } = source.next()

          if (done) {
            return { done }
          }

          if (filterFn(value, value)) {
            return { done, value }
          }
        }
      }
    }
  })
}

export function take (take) {
  return iterable(() => {
    const source = iterator(this)
    let taken = 0

    return {
      next: () => {
        const { done, value } = source.next()

        if (taken === take) {
          return { done: true }
        }

        taken += 1

        return { done, value }
      }
    }
  })
}

export function nth (n) {
  const source = iterator(this)
  let current = 0

  while (true) {
    const { done, value } = source.next()

    if (done) {
      return
    }

    if (current === n) {
      return value
    }

    current += 1
  }
}

export function into (convertFn) {
  return convertFn(this)
}