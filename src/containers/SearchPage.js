import React from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

class SearchPage extends React.Component {
  state = {
    books: []
  }

  search = (query) => {
    BooksAPI.search(query) // Here I'm using the API call to search books then I set the response into the state
    .then(res => this.setState({books: res}))
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => {
              this.search(e.target.value)
            }}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.length
              ? this.state.books.map(book => {// I'm maping through the array of books to render each one properly
                  let selected = ''

                  for (let bookshelf of this.props.bookshelfs) {// I'm checking if there's any book that currently happens to be on any shelf
                    for (let searchBook of bookshelf.books) {
                      if (searchBook.id === book.id) selected = bookshelf.shelfTitle
                    }
                  }

                  return <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={selected ? selected : 'initial'} onChange={(e) => {
                                    //I've settled the initial value for the select as the first, disabled, option to hadle the change for every possible option
                                    //If the book happens to be on any shelf, then it's value will be from it's shelf

                                    //Here I check for evey possible change, to filter the arguments to be passed down to the ".changeBookshelf()"
                                    let bookshelf = ''

                                    e.target.value === 'Currently Reading' // I'm checking which is the value of the selected option and parsing to an usable value
                                    ? bookshelf = 'currentlyReading'
                                    : e.target.value === 'Want to Read'
                                      ? bookshelf = 'wantToRead'
                                      : bookshelf = 'read'

                                    this.props.changeBookshelf(book, bookshelf) //I'm passing the selected book and the shelf to the function so it can be displayed on the index page
                                  }}>
                                    <option value="initial" disabled>Move to...</option>
                                    <option>Currently Reading</option>
                                    <option>Want to Read</option>
                                    <option>Read</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              {
                                book.authors
                                ? book.authors.map(author => <div key={Math.random().toString(36).substr(-8)} className="book-authors">{author}</div>)
                                : null
                              }
                            </div>
                          </li>
              })
              : null
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
