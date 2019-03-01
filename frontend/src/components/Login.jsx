import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const token = localStorage.getItem('token');

export class Login extends Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    jokes: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:3300/api/jokes', {
        headers: { Authorization: token }
      })
      .then(res => this.setState({ jokes: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };

  handleLogin = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/login', this.state.user)
      .then(res => localStorage.setItem('token', res.data.token))
      .catch(err => console.log(err));

    this.setState({
      user: {
        username: '',
        password: ''
      }
    });
  };

  render() {
    const mappedJokes = this.state.jokes.map(joke => (
      <div key={joke.id}>{joke.joke}</div>
    ));

    return (
      <>
        <FormStyles>
          <form>
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
            <Button size="small" onClick={this.handleLogin}>
              Login To See Jokes
            </Button>
          </form>
        </FormStyles>
        <JokeStyles>{mappedJokes}</JokeStyles>
      </>
    );
  }
}

export default Login;

const FormStyles = styled.div`
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

const JokeStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    margin: 10px 0;
  }
`;
