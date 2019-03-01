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
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = e => {
    axios
      .post('http://localhost:3300/api/login', this.state)
      .then(res => {
        localStorage.setItem('token', res.data.token);

        this.setState({
          username: '',
          password: ''
        });
      })
      .then(() => {
        this.props.history.push('./jokes');
      })
      .catch(err => console.log(err));
  };

  render() {
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
