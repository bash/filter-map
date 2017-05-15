export function range(start, end, step = 1) {
  let current = start

  return {
    next: () => {
      if (current > end) {
        return { done: true }
      }

      const value = current

      current += step

      return { done: false, value }
    },
    [Symbol.iterator]() {
      return this
    }
  }
}