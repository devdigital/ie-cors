import React, { Component } from 'react'
import apiService from './api-service'

// TODO: this is a quick workaround for testing from VirtualBox or your local machine
// in reality the hosts used would be part of application configuration
const onVirtualMachine = false
const uriHost = onVirtualMachine ? '10.0.2.2' : 'localhost'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [],
    }
  }

  componentDidMount() {
    apiService.get(`http://${uriHost}:5000/api/values`)
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
