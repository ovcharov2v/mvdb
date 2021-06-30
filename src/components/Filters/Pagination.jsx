import {Component} from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
  static propTypes = {    
    page: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
  }

  render() { 
    const {page, onChangePage} = this.props
    return ( 
      <div className="pagination-nav">
        <p>Current page: {page}</p>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page===1}
            onClick={()=>{
              onChangePage(page-1)
            }}>Prev page
          </button>
          <button type="button" className="btn btn-light" onClick={()=>{
            onChangePage(page+1)
          }}>Next page</button>
        </div>
      </div>
     );
  }
}
 
export default Pagination;