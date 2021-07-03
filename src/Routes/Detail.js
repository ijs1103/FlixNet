import React, {useState, useEffect} from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import MovieDetail from "Components/MovieDetail";
import TvDetail from "Components/TvDetail";
import { moviesApi, tvApi } from "../api";

export default function Detail() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let isMovie = useLocation().pathname.includes("/movie/");
  let history = useHistory();
  let params = useParams();

  async function getDetail() {
    
    const parsedId = parseInt(params.id);

    if (isNaN(parsedId)) {
      return history.push("/");
    }
    let contents = [];
    try {
      if (isMovie) {
        const { data: result } = await moviesApi.movieDetail(parsedId);
        console.log(result);
        contents = [
          {   
              tab: "info",
              content: {
                backdrop_path: result.backdrop_path,
                poster_path: result.poster_path,
                original_title: result.original_title,
                release_date: result.release_date,
                runtime: result.runtime,
                genres: result.genres,
                imdb_id: result.imdb_id,
                overview: result.overview,
                
              }         
          },
          {
            tab: "production",
            content: {
              production_companies: result.production_companies,
              production_countries: result.production_countries,
              casts: result.credits.cast,
            }
          },
          {
            tab: "trailer",
            content: {
              videos: result.videos.results
            }
          }
        ];
        setData(contents);
      } else {
        const { data: result } = await tvApi.showDetail(parsedId);
        contents = [
          { 
            tab: "info",
            content: {
              backdrop_path: result.backdrop_path,
              poster_path: result.poster_path,
              original_name: result.original_name,
              first_air_date: result.first_air_date,
              episode_run_time: result.episode_run_time,
              genres: result.genres,
              overview: result.overview,
              videos: result.videos.results
            }   
          },
          {
            tab: "production",
            content: {
              production_companies: result.production_companies,
              production_countries: result.production_countries,
              casts: result.credits.cast,
            }
          },
          {
            tab: "trailer",
            content: {
              videos: result.videos.results
            }
          },
          {
            tab: "seasons",
            content: {
              seasons: result.seasons
            }
          }
        ];
        setData(contents);
      }
    } catch {
      console.log("error");
      setError("Can't find anything.");
    } finally {
      setLoading(false);
      
    }
  }

  useEffect(
    ()=>{
      getDetail();
    }, []
  );
  
  return (loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (isMovie ? <MovieDetail data={data} /> : <TvDetail data={data} />));
}