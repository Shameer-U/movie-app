import { useState , useEffect} from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMovieDetail, removeMovieDetail } from "../../redux/actions/movieDetailActions";
import LANGUAGES from "../../constants/Languages";
import './movieDetail.css';
import Header from "../../components/header/Header";
import { TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import YouTube, { YouTubeProps } from 'react-youtube';
import IMAGES from '../../constants/Images';
import Spinner from "../../components/spinner/Spinner";

const MovieDetail = () => {
    const {movieId} = useParams();
    const dispatch = useDispatch();
    const {data, fetching} = useSelector((state) => state.movieDetailState);
    const [isCastSelected, setIsCastSelected] = useState(true);

    useEffect(() => {
        dispatch(fetchMovieDetail(movieId));
    
        return () => {
           dispatch(removeMovieDetail());
        };
    }, [movieId]);

    const castOrCrew = isCastSelected ? data?.credits?.cast : data?.credits?.crew;

    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso);
    }

    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    }

    const youTubeVideoId = data?.videos?.results?.filter((result) => {return result.type === 'Teaser'})[0]?.key;

    return (
        <>
            <Header/>
            {fetching && <Spinner />}
            <div className="movie-container">
                <div className="movie-detail-container">
                    { youTubeVideoId ?
                        (<div className="movie-teaser">
                            <YouTube videoId={youTubeVideoId} opts={opts} onReady={onPlayerReady} className='u-tube'/>
                        </div>)
                        : 
                        (
                          <div style={{height:'200px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                               <h4>Video not available</h4>
                          </div>
                        )
                    }
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
                    <div className="cast-and-crew">
                        <h4>Cast & Crew</h4>
                        <div className="cast-crew-heading">
                            <div className={isCastSelected && 'active'} onClick={() => setIsCastSelected(true)}>Cast</div>
                            <div className={isCastSelected == false && 'active'} onClick={() => setIsCastSelected(false)}>Crew</div>
                        </div>
                        <div className="movie-detail-card-container">
                            { castOrCrew ? ( castOrCrew.map((item, index) => {
                                
                                return (<div className="movie-detail-card-item" key={index}>
                                            <div className="movie-detail-card-inner">
                                                <div className="movie-detail-card-top">
                                                    <img className="movie-detail-card-poster" src={ item?.profile_path ? `${TMDB_IMAGE_BASE_URL}/original${item.profile_path}` : IMAGES.NO_IMAGE} alt='Image' />
                                                </div>
                                                <div className="movie-detail-card-bottom">
                                                    <div className="movie-detail-card-bottom-title">
                                                        <h4>{(item?.name?.length > 40) ? item?.name.substring(0, 40) + '...' : item?.name}</h4>
                                                    </div>
                                                    <div className="movie-detail-card-bottom-subtitle">
                                                        <p>{ isCastSelected ? item?.character : item?.job}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>);
                            })) : (
                            <div className="movie-detail-no-result">
                                    <h3>Data not availble</h3>
                            </div> )
                            }
                        </div>
                   </div>
                </div>
            </div>
        </>
    );
}

export default MovieDetail;