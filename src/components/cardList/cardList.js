import React from "react";
import './cardList.scss';
import NotAvailAbleImage from '../../assets/not-available.png';
import CardItem from '../cardItems/cardItem';
import useTmdbApi from "../../shared/tmdbApi";

function CardList(props) {
  let type = props.cardsDataObj.type;
  let amount = props.cardsDataObj.amount;
  let updateAmount = props.cardsDataObj.updateAmount;

  const query = useTmdbApi(props.cardsDataObj.method, props.cardsDataObj.path, props.cardsDataObj.cat)

  let cards;

  if (query) {
    cards = query.results
  }

  const applyAmountChange = (value)=>{
    // console.log(''+type, amount + value)
    updateAmount(type, amount + value)
  }

  if (cards) {
    return (
      <>
      <div className={`ui four doubling cards`}>
        {cards && cards.map((card, index) => {
            if (index < amount) {
              return <CardItem key={index} cardData={card} />
            }
            return null
          }
        )}
        {amount < cards.length
          ? <button className="fluid ui light button" onClick={()=>applyAmountChange(4)}>
            <i className="add icon"></i>
            Weitere Titel
          </button>
          : ''
        }
      </div>
      </ >

    )
  }

  if (!cards) {
    return (
      <div className="ui four doubling cards">
        {[1, 2, 3, 4].map(index => {
          return (
            <div className="card" key={index.toString()}>
              <div className="content">
                <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
                </div>
                <img className="ui wireframe image" src={NotAvailAbleImage} alt="" />
              </div>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default CardList;
