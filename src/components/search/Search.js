import React, {useState} from 'react';
import './search.scss';
import {useHistory} from 'react-router-dom';
import dateToLocale from "../../shared/dateToLocale";
import {tmdbApi} from "../../shared/tmdbApi"

function Search() {
  const history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState('')
  const [visible, setVisible] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const onSearch = (term) => {
    setSearchTerm(term)
    if(term.length > 3){
      tmdbApi('get', 'search', 'multi', term, (data) => {onResult({data})})
    }else {
      setVisible(false)
      setSearchResults('')
      setTotalResults(0)
    }
  }

  let onResult = (response) => {
    setTotalResults(parseInt(response.data['total_results']))
    // console.log('reslutCount: ',totalResults)
    if(totalResults > 0){
      // console.log('results: ',response.data['results'][0])
      setVisible(true)

      // group response by media type
      const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
          return result;
        }, {})
      }
      setSearchResults(groupBy(response.data['results'], 'media_type'))
    }
  }

  const hasResult = () => {
    if(parseInt(totalResults) !== 0){
      setVisible(true)
    }else {
      setVisible(false)
    }
  }

  return (
    <>
      <div className="right menu searchbar"
           onMouseLeave={() => setVisible(false)}
           onMouseEnter={() => hasResult()}>
        <div className="item">
          <div className="ui left aligned transparent category search">
            <div className="ui icon transparent inverted input">
              <input className="prompt" type="text" placeholder="Film oder TV-Serie finden"
                     value={searchTerm}
                     onChange={(e)=>{onSearch(e.target.value)}} />
              <i className="search icon"></i>
            </div>
            <div className={visible === true ? "results transition visible" : "results transition"}>
              <div className="category">
                <div className="name">Filme</div>
                <div className="results transition visible">
                  {searchResults  && searchResults.movie && searchResults.movie.map((element, index) =>
                  <a className="result" key={index}
                     onClick={() => {
                       setVisible(false)
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

              <div className="category">
                <div className="name">TV-Shows</div>
                <div className="results transition visible">
                  {searchResults && searchResults.tv && searchResults.tv.map((element, index) =>
                    <a className="result" key={index}>
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
