import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Saving Private Ryan', Description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.', ImagePath: 'https://www.imdb.com/title/tt0120815/mediaviewer/rm1924732160/?ref_=tt_ov_i'},
        { _id: 2, Title: 'This is Spinal Tap', Description: "Spinal Tap, one of England's loudest bands, is chronicled by film director Marty DiBergi on what proves to be a fateful tour.", ImagePath: 'https://www.imdb.com/title/tt0088258/mediaviewer/rm4265401600/?ref_=tt_ov_i'},
        { _id: 3, Title: 'Stand by Me', Description: 'After the death of one of his friends, a writer recounts a childhood journey with his friends to find the body of a missing boy.', ImagePath: 'https://www.imdb.com/title/tt0092005/mediaviewer/rm3808838912/?ref_=tt_ov_i'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const {movies, selectedMovie} = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty</div>;

    return (
      <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
      </div>
    );
  }
}

export default MainView;
