import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class ApiTest extends React.Component {
  getTopics() {
    axios.get('/api/topics')
      .then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err)
      })
  }
  login() {
    axios.get('/api/user/login', {
      accessToken: ''
    }).then(resp => {
      console.log(resp)
    }).catch(err => {
      console.log(err)
    })
  }
  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    return(
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
