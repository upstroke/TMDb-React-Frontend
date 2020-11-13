import React from "react";
import {useHistory} from 'react-router-dom';
import './cardItem.scss';
import notAvailableIMG from "../../assets/not-available.png";
import dateToLocale from '../../shared/dateToLocale';

function CardItem(props) {
  const data = props.cardData
  const history = useHistory()

  const getRatings = (amount) => {
    return Array.apply(null, {length: Math.round(amount)}).reduce(
      (acc, _, index) => {
        acc.push(index);
        return acc
      }, []
    )
  }


  if(!data){
    return (
      <div className="ui card">
        <div className="content">
          <div className="ui active centered inline loader"></div>
        </div>
      </div>
    )
  }

  return (
    <a href="/" className="card" onClick={(e) => {e.preventDefault(); history.push(`/details-view/${data.media_type}/${data.id}`)}}>
      <div className="image">
        <img src={data.backdrop_path !==null ? `http://image.tmdb.org/t/p/w342/${data.backdrop_path}` : notAvailableIMG} alt="" title={data.name ? data.name : data.title} />
        <div className={`ui top right attached label${data.media_type==='movie' ? ' blue' : ' teal'}`}>{data.media_type ? data.media_type : 'Discover'}</div>
      </div>
      <div className="content">
        <div className="header" title={data.name ? data.name : data.title}>{data.name ? data.name : data.title}</div>
        <div className="meta">
          <span className="date">{data.release_date ? dateToLocale(data.release_date) : dateToLocale(data.first_air_date)}</span>
        </div>
        <div className="description">
          {data.overview ? <p>{data.overview}</p> : <p>keine Informationen vorhanden</p>}
        </div>
      </div>
      <div className="extra content">
        <p>Rating:</p>
        {getRatings(data.vote_average).map((item) =>
          <i className="yellow star icon" key={item}></i>
        )} <small className="ui label">{Math.round(data.vote_average)}</small>
      </div>
      <button className="ui bottom attached button">
        <i className="add icon"></i>
        Weitere Informationen
      </button>
    </a>
  )
}

export default CardItem;
