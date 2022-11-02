import './movieCard.css';
import { Link } from "react-router-dom";
import { TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images';
import { FaHeart } from "react-icons/fa";

const MovieCard = ({item, index, width}) => {
    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso);
    }

    return (<div className="card-item" key={index} style={ width && {width:width}}>
            <Link to={`/movie/${item?.id}`}>
                <div className="card-inner">
                    <div className="card-top">
                        <img className="card-poster" src={item?.poster_path ? `${TMDB_IMAGE_BASE_URL}/original${item?.poster_path}` : IMAGES.NO_IMAGE} alt='Movie poster' />
                        <div className='card-rating'>
                            <img src={IMAGES.IMDB} />
                            <span>{item?.vote_average}</span>
                        </div>
                    </div>
                    <div className="card-bottom">
                        <div className="card-title">
                            <h4>{(item?.title?.length > 40) ? item?.title.substring(0, 40) + '...' : item?.title}</h4>
                        </div>
                        <div className="card-subtitle">
                            <p>{getLanguage(item?.original_language)?.english_name}</p>
                            <span><FaHeart />{item?.vote_count}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>);
}

export default MovieCard;