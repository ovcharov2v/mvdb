import {PureComponent} from "react";
import PropTypes from "prop-types";

export default class PrimaryReleaseYear extends PureComponent {
	static propTypes = {
		primary_release_year: PropTypes.string.isRequired,
		onChangeFilters: PropTypes.func.isRequired,
	};

	static defaultProps = {
		options: [
			{
				label: "2021",
				value: "2021",
			},
			{
				label: "2020",
				value: "2020",
			},
			{
				label: "2019",
				value: "2019",
			},
			{
				label: "2018",
				value: "2018",
			},
			{
				label: "2017",
				value: "2017",
			},
			{
				label: "2016",
				value: "2016",
			},
			{
				label: "2015",
				value: "2015",
			},
		],
	};

	render() {
		const { primary_release_year, onChangeFilters, options } = this.props;
		return (
			<div className="form-group mb-3">
        <label htmlFor="primary_release_year">Release year</label>
        <select name="primary_release_year" id="primary_release_year" className="form-control" value={primary_release_year} onChange={onChangeFilters}>
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
