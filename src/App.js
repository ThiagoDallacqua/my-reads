import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { MainPage, SearchPage } from './pages'
import './App.css'

class BooksApp extends React.Component {
  state = {
     bookshelfs: [] //I've createt a state to store the bookshelfs of a user, which contains the name of the bookshelf and the books of each one
  }

  setBookshelfs = () => {
    BooksAPI.getAll() //In order to bootstrap the application, and to get the latest status of the shelfs in the backend, I'm using this API call
    .then(res => {
      let currReadingBooks = res.filter((book) => { // Here I'm checking which shelf the book belongs to, in order filter an array of books to each shelf variable
        return book.shelf === 'currentlyReading'
      })
      let wtToReadBooks = res.filter((book) => {
        return book.shelf === 'wantToRead'
      })
      let readBooks = res.filter((book) => {
        return book.shelf === 'read'
      })

      this.setState({
        bookshelfs: [
          {
            shelfTitle: 'Currently Reading',
            books: [...currReadingBooks]  // Then here I set those variables into the state, on each array
          },
          {
            shelfTitle: 'Want to Read',
            books: [...wtToReadBooks]
          },
          {
            shelfTitle: 'Read',
            books: [...readBooks]
          }
        ]
      })

    })
    .catch(err => console.log(err))
  }

  changeBookshelf = (book, bookshelfTo) => {
    BooksAPI.update(book, bookshelfTo) // This function I use to change a book from bookshelfs and to set a new book into a shelf
    .then(() => {
      return this.setBookshelfs()
    })
  }

  componentDidMount(){
    return this.setBookshelfs()
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <MainPage bookshelfs={this.state.bookshelfs} changeBookshelf={this.changeBookshelf}/>
          )} />
          <Route path='/search' component={() => <SearchPage changeBookshelf={this.changeBookshelf} bookshelfs={this.state.bookshelfs}/>} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
