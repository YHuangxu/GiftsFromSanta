/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import _ from "lodash";
/*
 * Reviewed By: Abasiama Akpan
 * Good implementation of pagination 
 * Nice modularity of functions
 * Good use of eslint
 * Good use of meta headers and descriptions
 * Great file description. Easy to use for other developers
 * Application is very useful and novel
 */
class Pagination extends Component {
  render() {
    const {currentPage} = this.props;
    const pagesCount = Math.ceil(this.props.itemsCount / this.props.pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount+1);
    return (
      <nav>
        <ul className="pagination d-flex justify-content-center">
          { pages.map(page => <li key={page} className={page === currentPage? "page-item active":"page-item"}>
            <button className="page-link" onClick={() => this.props.onPageChange(page)}>{page}</button></li> )}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
