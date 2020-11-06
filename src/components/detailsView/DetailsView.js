import React from "react";
import './detailsView.scss';
import notAvailableIMG from "../../assets/not-available.png";
import dateToLocale from '../../shared/dateToLocale';
import {useParams} from 'react-router-dom';
import useTmdbApi from "../../shared/tmdbApi";

function DetailsView(props) {
  const {media,id} = useParams()
  // const history = useHistory()
  const detailsData = useTmdbApi('get',media,id)

  if(detailsData){
    return (
      <>
        <div className="ui inverted vertical center aligned masthead segment">
          <div className="masthead-image">
            <img src={detailsData.backdrop_path !==null ? `http://image.tmdb.org/t/p/original/${detailsData.backdrop_path}` : notAvailableIMG} alt="" />
          </div>
          <div className="ui text container">
            <h1 className="ui inverted header">
              {detailsData.title  ? detailsData.title : detailsData.name}
              {detailsData.poster_path
                ? <div className="poster">
                  <img src={`http://image.tmdb.org/t/p/w342/${detailsData.poster_path}`} alt="" />
                </div>
                : null
              }
            </h1>
            <ul className="ui inverted">
              {detailsData['production_companies'] ? detailsData['production_companies'].map((company, index) => <li className="item" key={index}>{company.name}</li>) : null}
              {detailsData['networks'] ? detailsData['networks'].map((company, index) => <li className="item" key={index}>{company.name}</li>) : null}

            </ul>
          </div>
        </div>

        <main className="ui text container details-view">

          <div className="ui celled horizontal list genres">
            {detailsData.genres ? detailsData.genres.map((genre, index) => <div className="item" key={index}>{genre.name}</div>) : null}
          </div>

          <div className="segment">
            <h2 className="ui medium header">Handlung:</h2>
            {detailsData.overview
              ? <p className="overview">{detailsData.overview}</p>
              : <small>keine Information vorhanden</small>
            }

            <h2 className="ui medium header">Homepage:</h2>
            <p>{detailsData.homepage
              ? <a className="home-link" href={detailsData.homepage} target="_blank" rel="noopener noreferrer">{detailsData.homepage.replace('https://','')}</a>
              : <small>keine Information vorhanden</small>
            }
            </p>

            <h2 className="ui medium header">Erschienen:</h2>
            {detailsData.release_date ? dateToLocale(detailsData.release_date) : null}
            {detailsData.first_air_date ? dateToLocale(detailsData.first_air_date ) : null}
            {!detailsData.release_date || !detailsData.first_air_date ? null : <p><small>keine Information vorhanden</small></p>}

            <h2 className="ui medium header">Produktion:</h2>
            {detailsData['production_companies'].length
              ? <ul>{detailsData['production_companies'].map((company, index) => <li key={index}>{company.name}</li>)}</ul>
              : <p><small>keine Information vorhanden</small></p>
            }

            {detailsData.runtime
              ? <><h2 className="ui medium header">Spieldauer:</h2><span>{detailsData.runtime} Minuten</span></>
              : null
            }
          </div>
        </main>`
      </>
    )
  }

  return (
    <div className="content">
      <div className="ui active centered inline loader"></div>
    </div>
  )


}

export default DetailsView;
