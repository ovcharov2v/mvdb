import {Component} from 'react';
import PropTypes from 'prop-types';


class SortBy extends Component {
  static propTypes = {
    sort_by: PropTypes.string.isRequired,
    onChangeFilters: PropTypes.func.isRequired
  }

  static defaultProps = {
    options: [
      {
        label: 'Popularity DESC',
        value: 'popularity.desc'
      },
      {
        label: 'Popularity ASC',
        value: 'popularity.asc'
      },
      {
        label: 'Vote average DESC',
        value: 'vote_average.desc'
      },
      {
        label: 'Vote average ASC',
        value: 'vote_average.asc'
      },
    ]
  }
  render() { 
    const {sort_by, onChangeFilters, options} = this.props
    return ( 
      <div className="form-group mb-3">
        <label htmlFor="sort_by">Sort by</label>
        <select name="sort_by" id="sort_by" className="form-control" value={sort_by} onChange={onChangeFilters}>
          {
            options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })
          }
        </select>
      </div>
     );
  }
}
 
export default SortBy;