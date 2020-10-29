import React, {useState} from "react";
import './cardItemFeatured.scss';
import useTmdbApi from '../../shared/tmdbApi'
import dateToLocale from '../../shared/dateToLocale';
import notAvailableIMG from '../../assets/not-available.png'
import {useHistory} from 'react-router-dom';

function CardItemFeatured(props) {
  const movie = useTmdbApi(props.cardDataObj.method,props.cardDataObj.path,props.cardDataObj.cat)
  const movieCast = useTmdbApi('get', `movie/${props.cardDataObj.cat}`,'credits')
  const history = useHistory()

  if(!movie || !movieCast){
    return (
      <div className="ui teaser card">
        <div className="content">
          <div className="ui active centered inline loader"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="ui teaser card">
      <div className="image" onClick={() => history.push(`/details-view/movie/${movie.id}`)}>
        <img src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} alt="" />
      </div>
      <div className="content has-header">
        <div className="header">
          {movie.title}
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
              <h2>{movie.original_title}</h2>
              <span className="releaseDate">
                <strong>Erschienen: </strong>{dateToLocale(movie.release_date)}
              </span>
            </div>
          </div>
          <div className="content">
            <div className="ui equal width grid">
              {movie['production_companies'].map((company, index) =>
                <div className="column" key={index}>
                  <img className="companyIMG" src={company.logo_path !==null ? `http://image.tmdb.org/t/p/w92/${company.logo_path}` : notAvailableIMG} alt="" />
                </div>
              )}
            </div>
          </div>
          <div className="event">
            <div className="content">
              <div className="summary">
                <h3 className="ui dividing header">Cast:</h3>

                <div className="ui grid">
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
            <p><a href={movie.homepage} target="_blank">{movie.homepage.replace('https://','')}</a></p>
          </div>
        </div>

      </div>

        <div className="ui bottom attached button" onClick={() => history.push(`/details-view/movie/${movie.id}`)}>
          <i className="add icon"></i>
          Weitere Informationen
        </div>

    </div>
  )
}

export default CardItemFeatured;