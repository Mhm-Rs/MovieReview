import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout';
import api from './api/axiosconfig'
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from "./components/notfound/NotFound"

function App() {
 
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getAllMovies = async () => {
    try{
      const response = await api.get("api/v1/movies");
    
      setMovies(response.data);
    }
    catch(err){
      console.log(err)
    }
  }

  const getMovieData = async(movieId) => {
    try{
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie)
      setReviews(singleMovie.reviewIds)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getAllMovies();
  },[])

  return (
   <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home movies={movies}/>}></Route>
        <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}></Route>
        <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
            
        </Route> 
      </Routes>

   </div>
  )
}

export default App
