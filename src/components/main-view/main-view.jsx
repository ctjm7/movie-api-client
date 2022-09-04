import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null,
        register: null
      };
  }

  componentDidMount(){
    axios.get('https://seeyouatmovies.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user registers, this function posts user information */
  onRegistration(register) {
    this.setState({
      register
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that particular user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const {movies, selectedMovie, user, register} = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
    if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

    if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
        ))
      }
      </div>
    );
  }
}

export default MainView;

MainView.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  onRegistration: PropTypes.func.isRequired
};
