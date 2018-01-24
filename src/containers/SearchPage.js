import React from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

class SearchPage extends React.Component {
  state = {
    books: []
  }

  search = (query) => {
    BooksAPI.search(query)
    .then(res => this.setState({books: res}))
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => {
              this.search(e.target.value)
            }}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.length
              ? this.state.books.map(book => {
                  let selected = ''

                  for (let bookshelf of this.props.bookshelfs) {
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

                                    //Here I check for evey possible change, to filter the arguments to be passed down to the ".changeBookshelf()"
                                    let shelf = ''

                                    if (e.target.value === 'Want to Read') {
                                      shelf = 'wantToRead'
                                    } else if (e.target.value === 'Read') {
                                      shelf = 'read'
                                    } else if (e.target.value === 'Currently Reading') {
                                      shelf = 'currentlyReading'
                                    }

                                    this.props.changeBookshelf(book, shelf)
                                  }}>
                                    <option value="initial" disabled>Move to...</option>
                                    <option>Currently Reading</option>
                                    <option>Want to Read</option>
                                    <option>Read</option>
                                    <option>None</option>
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
