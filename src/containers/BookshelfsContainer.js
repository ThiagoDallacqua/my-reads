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
                                          <select>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
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
