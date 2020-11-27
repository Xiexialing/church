export const filterQuery = (query) => {
  let obj = {}
  if (!!query) {
    Object.keys(query).forEach(key => {
      let value = query[key]
      if (!!value) {
        obj[key] = value
      }
    })
  }
  return obj
}
