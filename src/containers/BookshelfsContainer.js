import React from 'react'

const BookshelfsContainer = props => {
  return (
    <div className="list-books-content">
      <div>
        {
          props.bookshelfs.map(bookshelf => {
            return <div key={bookshelf.shelfTitle} className="bookshelf">
                    <h2 className="bookshelf-title">{bookshelf.shelfTitle}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          bookshelf.books.map(book => {
                            return <li key={book.bookTitle}>
                                    <div className="book">
                                      <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.bookCover}")` }}></div>
                                        <div className="book-shelf-changer">
                                          <select value='initial' onChange={(e) => {
                                            //I've settled the initial value for the select as the first, disabled, option to hadle the change for every possible option

                                            //Here I check for evey possible change, to filter the arguments to be passed down to the ".changeBookshelf()"
                                            if (e.target.value === 'currentlyReading' && bookshelf.shelfTitle !== 'Currently Reading') {
                                              props.changeBookshelf(bookshelf, book, 'Currently Reading')
                                            }

                                            if (e.target.value === 'wantToRead' && bookshelf.shelfTitle !== 'Want to Read') {
                                              props.changeBookshelf(bookshelf, book, 'Want to Read')
                                            }

                                            if (e.target.value === 'read' && bookshelf.shelfTitle !== 'Read') {
                                              props.changeBookshelf(bookshelf, book, 'Read')
                                            }

                                            if (e.target.value === 'none') {
                                              props.removeBook(bookshelf, book)
                                            }
                                          }}>
                                            <option value="initial" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option defaultValue value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="book-title">{book.bookTitle}</div>
                                      <div className="book-authors">{book.bookAuthor}</div>
                                    </div>
                                  </li>
                          })
                        }
                      </ol>
                    </div>
                  </div>
          })
        }
      </div>
    </div>
  )
}

export default BookshelfsContainer
