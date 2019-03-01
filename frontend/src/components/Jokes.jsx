import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

class Jokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/');
    }
    if (localStorage.getItem('token')) {
      axios
        .get('http://localhost:3300/api/jokes', {
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res => this.setState({ jokes: res.data }))
        .catch(err => console.log(err));
    }
  }

  render() {
    const mappedJokes = this.state.jokes.map(joke => (
      <div key={joke.id}>{joke.joke}</div>
    ));

    return (
      <div>
        <JokeStyles>{mappedJokes}</JokeStyles>
      </div>
    );
  }
}

export default Jokes;

const JokeStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    margin: 10px 0;
  }
`;
