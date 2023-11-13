import React from 'react';
import '../../styles/SearchPage.scss';
import SearchComponent from "./SearchComponent";



const SearchPage: React.FC = () => {

    return (
        <div className="search-page-content">
          <div className="search-wrapper">
            <div className="search-text">
              <div className="search-title">
                <h1>Find the necessary data just in a couple of clicks.</h1>
              </div>
              <div className="search-under-text">
                <p>Set search parameters.</p>
                <p>The more you fill in, the more accurate the search will be.</p>
              </div>
              <div className="search-component-wrapper">
                  <SearchComponent />
              </div>
            </div>
            <div className="search-pictures">
              <div className="pic2">
                <img src="/Document.png" />
              </div>
              <div className="pic3">
                <img src="/Folders.png" />
              </div>
              <div className="pic1">
                <img src="/pic1.png" />
              </div>
            </div>
          </div>
        </div>
      );
}

export default SearchPage;
