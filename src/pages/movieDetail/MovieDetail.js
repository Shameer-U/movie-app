import { useState , useEffect} from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMovieDetail, removeMovieDetail } from "../../redux/actions/movieDetailActions";
import LANGUAGES from "../../constants/Languages";
import './movieDetail.css'
import Header from "../../components/header/Header";

const MovieDetail = () => {
    const {movieId} = useParams();
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.movieDetailState);

    useEffect(() => {
        dispatch(fetchMovieDetail(movieId));
    
        return () => {
           dispatch(removeMovieDetail());
        };
    }, [movieId]);

    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso)
    }

       //console.log(data.credits.cast)

    return (
        <>
            <Header displayHeader={false}/>
            <div className="movie-container">
                <div className="movie-detail-container">
                    <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} />
                    </div>
                    <div className="basic-info">
                        <div className="title-and-likes">
                            <h4 className="movie-title">
                                {data?.original_title}
                            </h4>
                            <div className="movie-likes">
                                <i className="fa fa-heart"></i>
                                <span >{data?.vote_average}</span>
                            </div>
                        </div>
                        <p>
                            {data?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
                            {data?.runtime} Min
                        </p>
                        <p>
                            {getLanguage(data?.original_language)?.english_name}
                        </p>
                    </div>
                    <div className="movieOverview">
                        <h4>Overview</h4>
                        <p>{data?.overview}</p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail