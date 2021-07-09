import React, { Component } from "react";
import { API_URL, API_KEY_3, fetchApi } from "./api/api";
import "./App.scss";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters.jsx";
import MovieList from "./components/Movies/MovieList.jsx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

class App extends Component {
	constructor() {
		super();
		this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2021",
        with_genres: []
      },
      page: 1,
      total_pages: ""
    };
	}

	componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

	onChangeFilters = (event) => {
		const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
	};

	onChangePage = ({ page, total_pages = this.state.total_pages }) => {
		this.setState({
      page,
      total_pages
    });
	};

	updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

	render() {
		const { filters, page, total_pages, user, session_id } = this.state;
		return (
			<AppContext.Provider
        value={{
          user,
          session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId
        }}
      >
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
			</AppContext.Provider>
		);
	}
}

export default App;
