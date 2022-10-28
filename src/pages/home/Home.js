import { useState , useEffect} from "react";
import Header from "../../components/header/Header";
import './home.css';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchNowPlaying } from "../../redux/actions/nowPlayingActions";
import { fetchComingSoon } from "../../redux/actions/comingSoonActions";
import Slider from "react-slick";
import { TMDB_IMAGE_BASE_URL } from "../../constants/Urls";
import LANGUAGES from "../../constants/Languages";
import IMAGES from '../../constants/Images'

const Home = () => {
    const nowPlaying = useSelector((state) => state.nowPlayingState)
    const comingSoon = useSelector((state) => state.comingSoonState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchNowPlaying())
        dispatch(fetchComingSoon())
    }, [])

    const getLanguage = (language_iso) => { 
        return LANGUAGES.find((language) => language.iso_639_1 === language_iso)
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
                }
            },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


      return (
        <>
        <Header />
        <div className="home-container">
        <h2>Now Playing</h2>
        {nowPlaying.status ? 
            (<Slider {...settings}>
                {nowPlaying.data?.results?.map((item, index) => {
                    
                    return <div className="card-item">
                                <div className="card-inner">
                                    <div className="card-top">
                                        <img className="card-poster" src={`${TMDB_IMAGE_BASE_URL}/original${item.poster_path}`} alt='' />
                                        <div className='card-rating'>
                                            <img src={IMAGES.IMDB} />
                                            <span >{item.vote_average}</span>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <div className="movie-title">
                                            <h4>{(item.title.length > 40) ? item.title.substring(0, 40) + '...' : item.title}</h4>
                                        </div>
                                        <div className="movie-subtitle">
                                            <p>{getLanguage(item.original_language).english_name}</p>
                                            <span><i className='fa fa-heart'></i>{item.vote_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                })}
            </Slider>)
            : <div>{comingSoon.message}</div>
        }

        <h2>Coming Soon</h2>

        {comingSoon.status ? 
            (<Slider {...settings}>
                {nowPlaying.data?.results?.map((item, index) => {
                    
                    return <div className="card-item">
                                <div className="card-inner">
                                    <div className="card-top">
                                        <img className="card-poster" src={`${TMDB_IMAGE_BASE_URL}/original${item.poster_path}`} alt='' />
                                        <div className='card-rating'>
                                            <img src={IMAGES.IMDB} />
                                            <span >{item.vote_average}</span>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <div className="movie-title">
                                            <h4>{(item.title.length > 40) ? item.title.substring(0, 40) + '...' : item.title}</h4>
                                        </div>
                                        <div className="movie-subtitle">
                                            <p>{getLanguage(item.original_language).english_name}</p>
                                            <span><i className='fa fa-heart'></i>{item.vote_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                })}
            </Slider>)
            : <div>{comingSoon.message}</div>
        }

      </div>
      </>
      );
}

export default Home