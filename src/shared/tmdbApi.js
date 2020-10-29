import {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.REACT_APP_API_KEY
const lang = process.env.REACT_APP_LANG


export default function useTmdbApi(method, path, cat, query) {
  const [data, setData] = useState(null);

  useEffect(() => {
    tmdbApi(
      method,
      path,
      cat,
      query,
      data => setData(data)
    )
  }, [method, path, cat, query])

  return data;
}


export function tmdbApi(method, path, cat, query, callback) {
  let url

  if(!query){
    // results without parameter 'query'
    // ${baseUrl}/movie/12345/?${apiKey}&${lang}
    url = `${baseUrl}/${path}/${cat}?api_key=${apiKey}&language=${lang}`
  }else {
    // search with query string
    // ${baseUrl}/movie/multi/?${apiKey}&${lang}
    url = `${baseUrl}/${path}/${cat}?api_key=${apiKey}&language=${lang}&query=${query}`
  }

  axios({
    method: method,
    url: url
  })
  .then((response) => callback(response.data))
  .catch(err => {
    // what now?
    console.log(err);
  })
}
