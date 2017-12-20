import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import { MainPage, SearchPage } from './pages'
import './App.css'

class BooksApp extends React.Component {
  state = {
     bookshelfs: [//I've createt a state to store the bookshelfs of a user, which contains the name of the bookshelf and the books of each one
       {
         shelfTitle: 'Currently Reading',
         books: [
           {
             bookTitle: 'To Kill a Mockingbird',
             bookCover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
             bookAuthor: 'Harper Lee'
           },
           {
             bookTitle: "Ender's Game",
             bookCover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
             bookAuthor: 'Orson Scott Card'
           },
         ],
       },
       {
         shelfTitle: 'Want to Read',
         books: [
           {
             bookTitle: '1776',
             bookCover: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
             bookAuthor: 'David McCullough'
           },
           {
             bookTitle: "Harry Potter and the Sorcerer's Stone",
             bookCover: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
             bookAuthor: 'J.K. Rowling'
           },
         ],
       },
       {
         shelfTitle: 'Read',
         books: [
           {
             bookTitle: 'The Hobbit',
             bookCover: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
             bookAuthor: 'J.R.R. Tolkien'
           },
           {
             bookTitle: "Oh, the Places You'll Go!",
             bookCover: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
             bookAuthor: 'Seuss'
           },
           {
             bookTitle: "The Adventures of Tom Sawyer",
             bookCover: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
             bookAuthor: 'Mark Twain'
           },
         ],
       },
     ]
  }

  changeBookshelf = (bookshelfFrom, book, bookshelfTo) => {
    /*
    in this function I receive three arguments:
    - a bookshelf that the book is from
    - the book itself
    - a bookshelf to send the book to
    */
    let newFrom = bookshelfFrom
    newFrom.books = newFrom.books.filter(b => b.bookTitle !== book.bookTitle)
    // here, after passing the origin bookshelf I passed a new array of books without the selected book.

    let [ newTo ] = this.state.bookshelfs.filter(bookshelf => bookshelf.shelfTitle === bookshelfTo)
    newTo.books = [].concat(...newTo.books, book)
    //here I've passed the bookshelf to send the book, based on the option selected, and concatenated the book into a new array, containing the old one too

    let newState = this.state.bookshelfs.map(bookshelf => {
      if (bookshelf.shelfTitle === newFrom.shelfTitle) return bookshelf = newFrom
      if (bookshelf.shelfTitle === newTo.shelfTitle) return bookshelf = newTo
      return bookshelf
    })
    //here I've passed a new array of bookshelfs, based on the actual state, replacing the bookshelf origin and destination containing the new values

    this.setState({ bookshelfs: newState })
    //finaly, I update the state
  }

  removeBook = (bookshelf, book) => {
    /*
    in this function I receive two arguments:
    - a bookshelf that the book is from
    - the book itself
    */
    let newBookshelf = bookshelf
    newBookshelf.books = bookshelf.books.filter(b => b.bookTitle !== book.bookTitle)
    // here, after passing the origin bookshelf I passed a new array of books without the selected book.

    let newState = this.state.bookshelfs.map(bookshelf => {
      if (bookshelf.shelfTitle === newBookshelf.shelfTitle) return bookshelf = newBookshelf
      return bookshelf
    })
    //here I've passed a new array of bookshelfs, based on the actual state, replacing the bookshelf origin without the selected book

    this.setState({ bookshelfs: newState })
    //finaly, I update the state
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={() => (
            <MainPage bookshelfs={this.state.bookshelfs} changeBookshelf={this.changeBookshelf} removeBook={this.removeBook} />
          )} />
          <Route path='/search' component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
