import { Component } from "react";
import Pagination from "./Pagination";
import SortBy from "./SortBy";
import PropTypes from "prop-types";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres";

class Filters extends Component {
	static propTypes = {
		filters: PropTypes.object.isRequired,
		onChangeFilters: PropTypes.func.isRequired,
		page: PropTypes.number.isRequired,
		onChangePage: PropTypes.func.isRequired,
	};

	render() {
		const {
			filters: { sort_by, primary_release_year, with_genres },
			onChangeFilters,
			page,
			total_pages,
			onChangePage,
		} = this.props;
		return (
			<form action="#" className="mb-3">
				<SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
				<PrimaryReleaseYear
					primary_release_year={primary_release_year}
					onChangeFilters={onChangeFilters}
				/>
				<Genres with_genres={with_genres} onChangeFilters={onChangeFilters} />
				<Pagination
					page={page}
					total_pages={total_pages}
					onChangePage={onChangePage}
				/>
			</form>
		);
	}
}

export default Filters;
