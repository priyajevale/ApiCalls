// import React,{useCallback, useState,useEffect} from 'react';

// import MoviesList from './component/MoviesList';
// import './App.css';

// function App() {
//   const[movies,setMovies] =useState([]);
//   const[isLoading,setIsLoading] = useState(false);
//   const [error,setError]=useState(null);
 
//  const fetchMoviesHandler =useCallback (async () =>  {
//   setIsLoading(true);
//   setError(null);
//   try{
//     const response=await fetch('https://swapi.dev/api/films/');
//     if(!response.ok){
//       throw new Error('something went wrong');
//     }
//     const data=await response.json();
    
//     const transformedMovies=data.results.map(movieData =>{
//       return {
//         id:movieData.episode_id,
//         title:movieData.title,
//         openingText:movieData.opening_crawl,
//         releaseDate:movieData.releaseDate
//       };
//     });
//     setMovies(transformedMovies);
//     setIsLoading(false);
    
//   }catch(error){
//     setError(error.message);
//   }
//   setIsLoading(false);

//  },[]);
//  useEffect(()=>{
//   fetchMoviesHandler();
//     },[fetchMoviesHandler]);

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//        {!isLoading && movies.length >0 && <MoviesList movies={movies} />}
//        {!isLoading && movies.length===0 && !error && <p>found no  movies </p>}
//        {!isLoading && error && <p>{error}</p>}
//        {isLoading && <p>Loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';
// import MoviesList from './component/MoviesList';
// import './App.css';

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [retryIntervalId, setRetryIntervalId] = useState(null);

//   async function fetchMoviesHandler() {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://swapi.dev/api/films/');
//       if (!response.ok) {
//         throw new Error('Something went wrong');
//       }
//       const data = await response.json();

//       const transformedMovies = data.results.map(movieData => ({
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl,
//         releaseDate: movieData.release_date // Corrected typo: releaseDate -> release_date
//       }));
//       setMovies(transformedMovies);
//       setIsLoading(false);
//     } catch (error) {
//       setError('Something went wrong... Retrying');
//       retryFetchMovies();
//     }
//     setIsLoading(false);
//   }

//   function retryFetchMovies() {
//     const intervalId = setInterval(fetchMoviesHandler, 5000);
//     setRetryIntervalId(intervalId);
//   }

//   function cancelRetryHandler() {
//     clearInterval(retryIntervalId);
//     setError(null);
//   }

//   useEffect(() => {
//     return () => {
//       // Clean up retry interval when component unmounts
//       clearInterval(retryIntervalId);
//     };
//   }, [retryIntervalId]);

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//         {error && (
//           <button onClick={cancelRetryHandler}>Cancel Retry</button>
//         )}
//       </section>
//       <section>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && !error && (
//           <p>Found no movies</p>
//         )}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <p>Loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
import React, { useCallback, useState, useEffect } from 'react';

import MoviesList from './component/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: '',
    openingText: '',
    releaseDate: ''
  });

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date // corrected key name
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = () => {
    console.log(newMovie);
    // Here you can send a request to add the movie to the backend or update the state to display it on the front end
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value
    }));
  };

  return (
    <React.Fragment>
      <section>
        <form>
    
          <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
          />
          </div>
          <div className="form-control">
          <label htmlFor="openingText">Opening Text</label>
          <textarea
            id="openingText"
            name="openingText"
            value={newMovie.openingText}
            onChange={handleInputChange}
          ></textarea>
          </div>
          <div className="form-control">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="text"
            id="releaseDate"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={handleInputChange}
          />
          </div>
          <div className="form-actions">
          <button type="button" onClick={addMovieHandler}>
            Add Movie
          </button>
          </div>
        </form>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>found no movies </p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;