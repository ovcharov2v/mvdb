import { Component } from 'react';
import Pagination from './Pagination';
import SortBy from './SortBy';
import PropTypes, { object } from 'prop-types';

class Filters extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onChangeFilters: PropTypes.func.isRequired,    
    page: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
  }

  render() {
    const {
      filters: { sort_by },
      onChangeFilters,
      page,
      onChangePage
    } = this.props
    return (
      <form action="#" className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />        
        <Pagination page={page} onChangePage={onChangePage} />        
      </form>
    );
  }
}

export default Filters;