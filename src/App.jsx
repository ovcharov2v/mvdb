import { Component } from "react";
import "./App.scss";
import Filters from "./components/Filters/Filters.jsx";
import MovieList from "./components/Movies/MovieList.jsx";

class App extends Component {
	constructor() {
		super();
		this.state = {
			filters: {
				sort_by: "popularity.desc",
			},
      page: 1
		};
	}

  onChangeFilters = (event) => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    }
    this.setState({
        filters: newFilters
    })
  }

  onChangePage = (page) => {
    this.setState({
      page
    })
  }

	render() {
		const { filters, page } = this.state;
		return (
			<div className="container">
				<div className="row mt-4">
					<div className="col-4">
						<div className="card">
							<div className="card-body">
								<h3>Filters</h3>
								<Filters filters={filters} onChangeFilters={this.onChangeFilters} page={page} onChangePage={this.onChangePage} />
							</div>
						</div>
					</div>
					<div className="col-8">
						<MovieList filters={filters} page={page} onChangePage={this.onChangePage} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
