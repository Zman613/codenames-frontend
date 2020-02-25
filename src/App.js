import React, { Component, useState, useEffect } from 'react'
import Room from './containers/Room.js'
import Home from './containers/Home.js'
import CreateRoomForm from './components/CreateRoomForm.js';
import JoinRoomForm from './components/JoinRoomForm.js';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { API_ROOT, HEADERS } from './constants';



class App extends Component {

  state = {
    currentRoom: {},
    currentUser: {}
  }

  // const[getCurrentRoom, setCurrentRoom] = useState({ })
  // const[getUser, setUser] = useState({ })
  // const[getResponse, setResponse] = useState({ })
  setCurrentRoom = (currentRoom) => {
    this.setState({currentRoom})
  }

  setUser = (currentUser) => {
    this.setState({currentUser})
  }

  componentDidMount() {
    const token = localStorage.token
    const userToken = localStorage.user
    console.log("token", token)
    console.log("user token", userToken)
    if (!!token && !!userToken) {
      fetch(`${API_ROOT}/auto-login`, {
        headers: {
          Authorization: token,
          User: userToken
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.errors) {
            alert(response.errors)
          } else {
            console.log('response get:', response)
            this.setState({
              currentRoom: response.room.room,
              currentUser: response.user
            }, () => {
              !!this.state.currentRoom.id && !!this.state.currentUser.id ? this.props.history.push('/room') : this.props.history.push('/home')
            })
          }
        })
    }
    else {
      this.props.history.push('/home')
    }
  }

  logout = () => {
    this.setState({ currentRoom: {}, currentUser: {}})
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.props.history.push('/home')
  }

  deleteRoom = () => {
    let id = this.state.currentRoom.id
    fetch(`${API_ROOT}/rooms/${id}`, {
      method: 'DELETE'
    })
    .then(() => this.logout())
  }

  render() {
    console.log('current room: ', this.state.currentRoom)
    console.log('current user: ', this.state.currentUser)

    return (
      <div className="App">
        <Switch>
          <Route path="/home" render={(routerProps) => <Home {...routerProps} />} />
          <Route path="/create-room" render={(routerProps) => <CreateRoomForm {...routerProps} setUser={this.setUser} setCurrentRoom={this.setCurrentRoom} />} />
          <Route path="/join-room" render={(routerProps) => <JoinRoomForm {...routerProps} setUser={this.setUser} setCurrentRoom={this.setCurrentRoom} />} />
          {!!this.state.currentRoom.id && <Route path="/room" render={(routerProps) => <Room {...routerProps} room={this.state.currentRoom} user={this.state.currentUser} setRoom={this.setCurrentRoom} logout={this.logout} deleteRoom={this.deleteRoom} />} />}
        </Switch>
      </div>
    );
  }

}

export default App;
