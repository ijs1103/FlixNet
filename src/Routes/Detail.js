import React, {useState, useEffect} from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { contents } from "Components/handleData";
import DetailPage from "Components/DetailPage";
import { moviesApi, tvApi } from "../api";

export default function Detail() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let isMovie = useLocation().pathname.includes("/movie/");
  let history = useHistory();
  let params = useParams();
  let datas = [];
  async function getDetail() {
    
    const parsedId = parseInt(params.id);

    if (isNaN(parsedId)) {
      return history.push("/");
    }
    
    try {
      if (isMovie) {
        const { data: result } = await moviesApi.movieDetail(parsedId);
        datas = contents(result);
      } else {
        const { data: result } = await tvApi.showDetail(parsedId);
        datas= contents(result);
      } 
      setData(datas);
    } catch {
      console.log("error");
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
        <title>Loading | FlixNet</title>
      </Helmet>
      <Loader />
    </>
  ) : <DetailPage data={data}/>);
}



