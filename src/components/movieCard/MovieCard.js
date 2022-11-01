import './movieCard.css';
import { Link } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images';

const MovieCard = ({item, index}) => {
    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso)
    }

    return (
        <div className="card-item" key={index}>
            <Link to={`/movie/${item?.id}`}>
                <div className="card-inner">
                    <div className="card-top">
                        <img className="card-poster" src={`${TMDB_IMAGE_BASE_URL}/original${item?.poster_path}`} alt='' />
                        <div className='card-rating'>
                            <img src={IMAGES.IMDB} />
                            <span>{item?.vote_average}</span>
                        </div>
                    </div>
                    <div className="card-bottom">
                        <div className="movie-title">
                            <h4>{(item?.title?.length > 40) ? item?.title.substring(0, 40) + '...' : item?.title}</h4>
                        </div>
                        <div className="movie-subtitle">
                            <p>{getLanguage(item?.original_language)?.english_name}</p>
                            <span><i className='fa fa-heart'></i>{item?.vote_count}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard