import React from "react";
import './cardItemFeatured.scss';
import useTmdbApi from '../../shared/tmdbApi'
import dateToLocale from '../../shared/dateToLocale';
import {useHistory} from 'react-router-dom';

function CardItemFeatured(props) {
  const movie = useTmdbApi(props.cardDataObj.method,props.cardDataObj.path,props.cardDataObj.cat)
  const movieCast = useTmdbApi('get', `${props.cardDataObj.path}/${props.cardDataObj.cat}`,'credits')
  const history = useHistory()

  if(!movie || !movieCast){
    return (
      <div className="ui teaser card">
        <div className="content">
          <div className="ui active text loader">Loading</div>
        </div>
      </div>
    )
  }

  return (
    <a href="/" className="ui teaser card" onClick={(e) => {e.preventDefault(); history.push(`/details-view/${props.cardDataObj.path}/${movie.id}`)}}>
      <div className="image">
        <img src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt="" />
        <div className={`ui top right attached label${movie.release_date ? ' blue' : ' teal'}`}>{movie.release_date ? 'movie' : 'tv'}</div>
      </div>
      <div className="content has-header">
        <div className="header">
          {movie.original_title ? movie.original_title : movie.original_name}
        </div>
      </div>
      <div className="content">
        <h4 className="ui sub header">
          GENRE:&nbsp;
          {movie['genres'].map((genre, index) =>
            <span key={index}>{genre.name}{index+1 < movie.genres.length? ' / ' : ''}</span>
          )}
        </h4>
        <div className="ui feed">
          <div className="event">
            <div className="content">
              <h2>{movie.original_title ? movie.original_title : movie.original_name}</h2>
              <span className="releaseDate">
                <strong>Erschienen: </strong>{movie.release_date ? dateToLocale(movie.release_date) : dateToLocale(movie.first_air_date)}
              </span>
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="description">
                {movie.overview ? <p>{movie.overview}</p> : <p>keine Informationen vorhanden</p>}
              </div>
            </div>
          </div>
          <div className="ui hidden divider"></div>
          <div className="event">
            <div className="content">
              <div className="summary">
                <h3 className="ui dividing header">Cast:</h3>

                <div className={`ui grid${movieCast.cast.length > 12 ? ' scroller' : ''}`}>
                  {movieCast.cast.map((element,index) =>
                  <div className="four wide column cast" key={index}>
                    <span className="header">{element.character}</span><br />
                    <span className="meta">{element.name},&nbsp;</span>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer">
          <div className="content">
            <h3 className="ui dividing header">Webseite:</h3>
            <p><button className="link" href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage.replace('https://','')}</button></p>
          </div>
        </div>

      </div>

        <button className="ui bottom attached button">
          <i className="add icon"></i>
          Weitere Informationen
        </button>

    </a>
  )
}

export default CardItemFeatured;
