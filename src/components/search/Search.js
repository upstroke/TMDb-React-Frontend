import React, {useState} from 'react';
import './search.scss';
import dateToLocale from "../../shared/dateToLocale";
import {tmdbApi} from "../../shared/tmdbApi"
import {useHistory} from 'react-router-dom';


function Search(props) {
  const history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [totalResults, setTotalResults] = useState(0)

  const onSearch = (term) => {
    setSearchTerm(term)
    if(term.length > 3){
      tmdbApi('get', 'search', 'multi', term, (data) => {onResult({data})})
    }else {
      props.updateVisible(false)
      setSearchResults('')
      setTotalResults(0)
    }
  }

  let onResult = (response) => {
    setTotalResults(parseInt(response.data['total_results']))
      // console.log('reslutCount: ',totalResults)
    if(response.data.results.length > 0){
      props.updateVisible(true)

      // group response by media type
      const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
          return result;
        }, {})
      }
      setSearchResults(groupBy(response.data['results'], 'media_type'))
    }else {
      props.updateVisible(false)
    }
  }

  return (
    <>
      <div className="right menu searchbar">
        <div className="item">
          <div className="ui left aligned transparent category search">
            <div className="ui icon transparent inverted input">
              <input className="prompt" type="text" placeholder="Film oder TV-Serie finden"
                     value={searchTerm}
                     onChange={(e)=>{onSearch(e.target.value)}}
                     onMouseEnter={totalResults > 0 ? ()=>props.updateVisible(true) : null} />
              <i className="search icon"></i>
            </div>
            <div className={props.visible === true ? "results transition visible" : "results transition"} onMouseLeave={()=>props.updateVisible(false)}>
              <div className={`category ${searchResults.movie ? '' : 'hidden'}`}>
                <div className="name">Filme</div>
                <div className="results transition visible">
                  {searchResults  && searchResults.movie && searchResults.movie.map((element, index) =>
                  <a className="holy result" key={index}
                     onClick={() => {
                       props.updateVisible(false)
                       history.push(`/details-view/${element.media_type}/${element.id}`)}}>
                    <div className="content">
                      <div className="title">{element.title}</div>
                      <div className="description">
                        <small>{dateToLocale(element['release_date'])}</small>
                      </div>
                    </div>
                  </a>
                  )}
                </div>
              </div>

              <div className={`category ${searchResults.tv ? '' : 'hidden'}`}>
                <div className="name">TV-Shows</div>
                <div className={"results transition"}>
                  {searchResults && searchResults.tv && searchResults.tv.map((element, index) =>
                    <a className="holy result" key={index}
                       onClick={() => {
                         props.updateVisible(false)
                         history.push(`/details-view/${element.media_type}/${element.id}`)}}>
                      <div className="content">
                        <div className="title">{element.name}</div>
                        <div className="description">
                          <small>{dateToLocale(element['first_air_date'])}</small>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search;
