import languages from '../data/languages.json'

const ajaxFindLanguage = function (query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = languages.filter((element, index, array) => {
        return element.name.toLowerCase().includes(query.toLowerCase())
      })
      resolve(results)
    }, 1000)
  })
}

export default ajaxFindLanguage
