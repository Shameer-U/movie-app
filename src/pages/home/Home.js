import { useState , useEffect} from "react";
import Header from "../../components/header/Header";
import './home.css';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchNowPlaying, removeNowPlaying } from "../../redux/actions/nowPlayingActions";
import { fetchTopRated, removeTopRated } from "../../redux/actions/topRatedActions";
import Slider from "react-slick";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";

const Home = () => {
    const nowPlaying = useSelector((state) => state.nowPlayingState);
    const topRated = useSelector((state) => state.topRatedState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNowPlaying());
        dispatch(fetchTopRated());

        return () => {
          dispatch(removeNowPlaying());
          dispatch(removeTopRated());
        }
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
      }


      return (
        <>
        <Header displaySearch={true} />
        {(nowPlaying?.fetching || topRated?.fetching)  ? <Spinner /> : null}
        <div className="home-container">
        <h2 className="home-section-title">Now Playing</h2>
        {nowPlaying?.status ? 
            (<Slider {...settings}>
                {nowPlaying?.data?.results?.map((item, index) => {
                    return <MovieCard item={item} index={index} key={index}/>;
                })}
            </Slider>)
            : (<div className="no-result">{nowPlaying?.message}</div>)
        }

        <h2 className="home-section-title">Top Rated</h2>

        {topRated?.status ? 
            (<Slider {...settings}>
                {topRated?.data?.results?.map((item, index) => {
                    return <MovieCard item={item} index={index} key={index}/>;
                })}
            </Slider>)
            : (<div className="no-result">{topRated?.message}</div>)
        }

      </div>
      </>
      );
}

export default Home;