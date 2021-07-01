import React, { Component } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters.jsx";
import MovieList from "./components/Movies/MovieList.jsx";

class App extends Component {
	constructor() {
		super();
		this.state = {
			filters: {
				sort_by: "popularity.desc",
				primary_release_year: "2021",
				with_genres: [],
			},
			page: 1,
			total_pages: "",
		};
	}

	onChangeFilters = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState((prevState) => ({
			filters: {
				...prevState.filters,
				[name]: value,
			},
		}));
	};

	onChangePage = ({ page, total_pages = this.state.total_pages }) => {
		this.setState({
			page,
			total_pages,
		});
	};

	render() {
		const { filters, page, total_pages } = this.state;
		return (
			<React.Fragment>
				<Header />
				<div className="container">
					<div className="row mt-4">
						<div className="col-4">
							<div className="card">
								<div className="card-body">
									<h3>Filters</h3>
									<Filters
										filters={filters}
										onChangeFilters={this.onChangeFilters}
										page={page}
										total_pages={total_pages}
										onChangePage={this.onChangePage}
									/>
								</div>
							</div>
						</div>
						<div className="col-8">
							<MovieList
								filters={filters}
								page={page}
								onChangePage={this.onChangePage}
							/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
