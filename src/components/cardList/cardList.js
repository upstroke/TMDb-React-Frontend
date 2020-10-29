import React from "react";
import CardItem from '../cardItems/cardItem'
import useTmdbApi from "../../shared/tmdbApi"

function CardList(props) {
  const query = useTmdbApi(props.cardsDataObj.method,props.cardsDataObj.path,props.cardsDataObj.cat)
  let cards

  if(query){
    cards = query.results
    // console.log(cards)
  }

  return (
    <div className="ui three cards">
      {cards && cards.map((card, index) => {
        if(index < props.amount){
          return <CardItem key={index} cardData={card} />
        }else return null
      }
      )}
    </div>
  )



}

export default CardList;
