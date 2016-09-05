import fetch from 'isomorphic-fetch'

class ApiService {
  get(uri) {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => {
          if (response.status >= 400) {
            reject({ message: 'Error response from server' })
            return
          }

          resolve(response.json())
        })
        .catch(error => reject({ message: error.message }))
    })
  }
}

export default new ApiService()
