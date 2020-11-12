import React, {useState} from 'react';
import './App.scss';
import Search from './components/search/Search'
import CardList from './components/cardList/cardList'
import CardItemFeatured from './components/cardItems/cardItemFeatured'
import DetailsView from './components/detailsView/DetailsView'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';

function App() {
  const [visible, setVisible] = useState(false)

  let updateVisible = (value) => {
    setVisible(value)
  }

  return (
    <>
      <div className="ui top fixed inverted menu">
        <div className="ui container">
          <NavLink to="/home" className="item" activeClassName="active">
            <i className="home icon"></i> Home
          </NavLink>
          <NavLink to="/movies" className="item" activeClassName="active">
            <i className="film icon"></i> Filme
          </NavLink>
          <NavLink to="/tv-shows" className="item" activeClassName="active">
            <i className="tv icon"></i> TV-Shows
          </NavLink>
          <Search visible={visible} updateVisible={updateVisible} />
        </div>
      </div>


      <Switch>
        <Route path="/details-view/:media/:id">
          <DetailsView />
        </Route>
        <Route path="/home">
          <main className="ui container">
            <h2 className="ui dividing header">Discover</h2>
            <div className="spacer">
              <p>Discover movies by different types of data like average rating, number of votes, genres and certifications.</p>
            </div>
            <CardList cardsDataObj={{method: 'get',path: 'trending',cat: 'all/day'}} amount={6}/>
            <h2 className="ui dividing header">Featured Today</h2>
            <CardItemFeatured cardDataObj={{method: 'get',path: 'tv',cat: '62286'}} />
          </main>
        </Route>
        <Route path="/movies">
            <main className="ui container">
            <h2 className="ui dividing header">Top Rated</h2>
            <CardList cardsDataObj={{method: 'get',path: 'trending',cat: 'movie/week'}} amount={18}/>
              <h2 className="ui dividing header">Featured Today</h2>
              <CardItemFeatured cardDataObj={{method: 'get',path: 'movie',cat: '181808'}} />
          </main>
        </Route>
        <Route path="/tv-shows">
          <main className="ui container">
            <h2 className="ui header">What's on TV</h2>
            <CardList cardsDataObj={{method: 'get',path: 'trending',cat: 'tv/week'}} amount={18}/>
            <h2 className="ui dividing header">Featured Today</h2>
            <CardItemFeatured cardDataObj={{method: 'get',path: 'tv',cat: '67198'}} />
          </main>
        </Route>
        <Route exact path="">
          <Redirect to="/home" />
        </Route>
      </Switch>

      <footer className="ui bottom fixed inverted menu">
        <div className="ui inverted segment">
          <div className="ui inverted secondary text menu">
            <button className="item" >Conditions of Use</button>
            <button className="item" >Privacy Policy</button>
            <a className="item" href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">Content: © by IMDb.com, Inc.</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App;
