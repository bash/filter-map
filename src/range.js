function iterator (start, end, step) {
  let current = start

  return {
    next: () => {
      if (current > end) {
        return { done: true }
      }

      const value = current

      current += step

      return { done: false, value }
    }
  }
}

export function range (start, end, step = 1) {
  return {
    start,
    end,
    step,
    [Symbol.iterator]() {
      return iterator(this.start, this.end, this.step)
    }
  }
}