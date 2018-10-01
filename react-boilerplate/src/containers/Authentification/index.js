import React, { PureComponent } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Container from './styles/Container'


const VerticalSpacement = {
  marginTop: '8px'
}


class Authentification extends PureComponent {
  
  state = {
      email: '',
      password: '',
      username: '',
  }

  login = () => {
    const { email, password, username,} = this.state

    fetch('http://localhost:1337/auth/local', {
    method: 'POST',
    body: {
      identifier: email, password 
    },
    Headers:{
      'Content-Type': 'application/json'
    }
  }).then(data => console.log(data));
    

  }


    handleChangeEmail = e => this.setState({email: e.target.value})
    
    handleChangePassword = e => this.setState({password: e.target.value})

    handleChangeUsername = e => this.setState({username: e.target.value}) 



  render(){
    return(
      <Container>
        <Input label="Username" onChange={this.handleChangeUsername}/>
        <Input label="Email" onChange={this.handleChangeEmail} style={VerticalSpacement} type="email"/>
        <Input label="Password" onChange={this.handleChangePassword} style={VerticalSpacement} type="password"/>
        <Button onClick={this.login} style={VerticalSpacement}>Log</Button>
      </Container>
    )
  }
}

export default Authentification