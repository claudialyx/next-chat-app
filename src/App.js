import React, { Component } from 'react';
import './App.css';
import Title from './Title';
import { Container, Grid, Segment } from 'semantic-ui-react';
import moment from 'moment';
import SendMessageForm from './SendMessageForm';
import DisplayChat from './DisplayChat';
import Socket from './utils/Socket';
import UsersSection from './UsersSection';
import bg from './bg.png';

class App extends React.Component {
  state = {
    textInput: '',
    myUser: {},
    onlineUsers: [],
    incomingData: [],
  }

  sendMessage = () => {
    const { myUser, textInput } = this.state;
    const dateNow = Date.now()
    const time = moment(dateNow).calendar()
    const newMessage = {
      username: myUser.username, message: textInput.trim(), timestamp: time
    };
    console.log('timestamp:', dateNow);
    textInput != '' && Socket.emit('BROADCAST_MESSAGE', newMessage)
    this.setState({
      textInput: '',
    })
  }

  messageTyped = (event) => {
    console.log(this.state.textInput)
    this.setState({
      textInput: event.target.value,
    })
  }

  enterKeySubmit = (e) => {
    if (e.which == 13 && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  componentDidMount() {
    // Once the chat app is loaded, we tell server that we are joining
    Socket.emit('NEW_USER')

    // we got newUser object from the server,which we can use to do whatever we want, such as displaying the name and id
    Socket.on('GET_CURRENT_USER', newUser => {
      console.log('newUser:', newUser)
      this.setState({
        myUser: newUser
      })
    })

    Socket.on('UPDATE_USER_LIST', users => {
      console.log('onlineuser:', this.state.onlineUsers);
      this.setState({
        onlineUsers: users,
      })
    })

    Socket.on('RECEIVE_BROADCAST', data => {
      const incomingDataClone = [...this.state.incomingData];
      incomingDataClone.push(data)
      console.log("incomingData:", data)
      this.setState({
        incomingData: incomingDataClone,
      })
    })

    Socket.on('HAS_ERROR', data => {
      console.log(data)
    })
  }


  render() {
    const { textInput, myUser, time, onlineUsers, incomingData, data } = this.state
    const size = {
      mobileS: '320px',
      mobileM: '375px',
      mobileL: '425px',
      tablet: '768px',
      laptop: '1024px',
      laptopL: '1440px',
      desktop: '2560px'
    }


    return (
      <>
        <Title />
        <Grid columns={2} style={{ marginTop: 0 }} >
          <Grid.Row stretched>
            <Grid.Column style={{ width: "20vw", marginLeft: "3vw", marginRight: "vw" }}>
              <Segment style={{ height: "85vh", display: "flex", flexDirection: "column", backgroundImage: `url(${bg})` }}><UsersSection onlineUsers={onlineUsers} myUser={myUser} /></Segment>
            </Grid.Column>
            <Grid.Column style={{ width: "77vw", marginLeft: "vw" }}>
              <Segment style={{ height: "65vh", backgroundImage: `url(${bg})` }}>
                <DisplayChat time={time} myUser={myUser} incomingData={incomingData} textInput={textInput} sendMessage={this.sendMessage} messageTyped={this.messageTyped} />
              </Segment>
              <Segment style={{ height: "20vh", backgroundImage: `url(${bg})` }}>
                <Container style={{ maxWidth: "95%" }} >
                  <SendMessageForm enterKeySubmit={this.enterKeySubmit} incomingData={incomingData} textInput={textInput} sendMessage={this.sendMessage} messageTyped={this.messageTyped} />
                </Container >
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}


export default App;
