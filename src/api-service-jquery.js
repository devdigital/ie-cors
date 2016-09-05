import $ from 'jquery'

class ApiService {
  get(uri) {
    return new Promise(resolve => {
      $.get(uri).done((data) => resolve(data))
    })
  }
}

export default new ApiService()
