import React from 'react';
import './App.scss';
import Search from './components/search/Search'
import CardList from './components/cardList/cardList'
import CardItemFeatured from './components/cardItems/cardItemFeatured'
import DetailsView from './components/detailsView/DetailsView'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';


function App() {

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
          <Search />
        </div>
      </div>


      <Switch>
        <Route path="/details-view/:media/:id">
          <DetailsView />
        </Route>
        <Route path="/home">
          <main className="ui container">
            <h1 className="ui dividing header">Seite Home</h1>
            <h2 className="ui dividing header right">Discover</h2>
            <div className="spacer">
              <p>Discover movies by different types of data like average rating, number of votes, genres and certifications.</p>
            </div>
            <CardList cardsDataObj={{method: 'get',path: 'trending',cat: 'all/day'}} amount={6}/>
            <h2 className="ui dividing header">Featured Today</h2>
            <CardItemFeatured cardDataObj={{method: 'get',path: 'movie',cat: '458576'}} />
          </main>
        </Route>
        <Route path="/movies">
            <main className="ui container">
            <h1 className="ui dividing header">Filme</h1>
            <h3 className="ui header">Top Rated</h3>
            <CardList cardsDataObj={{method: 'get',path: 'trending',cat: 'movie/week'}} amount={18}/>
          </main>
        </Route>
        <Route path="/tv-shows">
          <main className="ui container">
            <h1 className="ui dividing header">TV-Shows</h1>
            <h3 className="ui header">What's on TV</h3>
            <CardList cardsDataObj={{method: 'get',path: 'trending',cat: 'tv/week'}} amount={18}/>
          </main>
        </Route>
        <Route exact path="">
          <Redirect to="/home" />
        </Route>
      </Switch>

      <footer className="ui bottom fixed inverted menu">
        <div className="ui inverted segment">
          <div className="ui inverted secondary text menu">
            <a className="item">Conditions of Use</a>
            <a className="item">Privacy Policy</a>
            <a className="item" href="https://www.imdb.com/" target="_blank">Content: © by IMDb.com, Inc.</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App;