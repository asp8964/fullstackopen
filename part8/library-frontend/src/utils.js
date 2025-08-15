export const updateCache = (cache, query, data) => {
  cache.updateQuery(query, (result) => {
    const uniqByName = (a) => {
      let seen = new Set()
      const result = a.filter((item) => {
        let k = item.id
        return seen.has(k) ? false : seen.add(k)
      })
      return result
    }
    return {
      allBooks: uniqByName(result?.allBooks?.concat(data)),
    }
  })
}
