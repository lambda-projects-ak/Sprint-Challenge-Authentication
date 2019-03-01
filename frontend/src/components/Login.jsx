import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = e => {
    e.preventDefault();
    axios
      .post('/login', this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    this.setState({
      username: '',
      password: ''
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
        <Input
          name="username"
          value={this.state.username}
          placeholder="username"
          onChange={this.handleChange}
        />
        <Input
          name="password"
          value={this.state.password}
          placeholder="password"
          onChange={this.handleChange}
        />
        <Button size="small">Login To See Jokes</Button>
      </Form>
    );
  }
}

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 200px;
  height: 150px;
  margin: 0px auto;
  padding: 20px 20px;
  border: 1px solid lightgrey;

  input {
    width: 200px;
  }

  button {
    font-size: 12px;
    width: 150px;
    margin: 20px auto 0 auto;
    border: 1px solid grey;
  }
`;
