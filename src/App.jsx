import React, { Component } from 'react'
import apiService from './api-service'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [],
    }
  }

  componentDidMount() {
    apiService.get('http://10.0.2.2:5000/api/values')
      .then(values => {
        this.setState({
          values,
        })
      })
      .catch(() => {
        this.setState({
          values: [],
        })
      })
  }

  render() {
    return (
      <ul>
        {this.state.values.map((v, i) => <li key={i}>{v.number}</li>)}
      </ul>
    )
  }
}

export default App
