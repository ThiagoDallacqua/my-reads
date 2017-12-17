import React from 'react'
import PageHeading from '../components/PageHeading.js'
import SearchButton from '../components/SearchButton.js'
import BookshelfsContainer from './BookshelfsContainer.js'

const MainPage = props => {
  return (
    <div className="list-books">
      <PageHeading title={'MyReads'} />
      <BookshelfsContainer bookshelfs={props.bookshelfs} />
      <SearchButton onClick={() => this.setState({ showSearchPage: true })} />
    </div>
  )
}

export default MainPage
