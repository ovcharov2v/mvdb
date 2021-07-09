import { Component } from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";
import { AppContext } from "../../../App";
import classNames from "classnames";

class LoginForm extends Component {
	state = {
		username: "",
		password: "",
		errors: {},
		submitting: false,
	};

	onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState((prevState) => ({
			[name]: value,
			errors: {
				...prevState.errors,
				base: null,
				[name]: null,
			},
		}));
	};

	handleBlur = () => {
		//console.log("on blur");
		const errors = this.validateFields();
		if (Object.keys(errors).length > 0) {
			this.setState((prevState) => ({
				errors: {
					...prevState.errors,
					...errors,
				},
			}));
		}
	};

	validateFields = () => {
		const errors = {};

		if (this.state.username === "") {
			errors.username = "Not empty";
		}

		return errors;
	};

	onSubmit = () => {
		this.setState({
			submitting: true,
		});
		fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
			.then((data) => {
				return fetchApi(
					`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
					{
						method: "POST",
						mode: "cors",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							username: this.state.username,
							password: this.state.password,
							request_token: data.request_token,
						}),
					}
				);
			})
			.then((data) => {
				return fetchApi(
					`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
					{
						method: "POST",
						mode: "cors",
						headers: {
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							request_token: data.request_token,
						}),
					}
				);
			})
			.then((data) => {
				this.props.updateSessionId(data.session_id);
				return fetchApi(
					`${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`
				);
			})
			.then((user) => {
				this.setState(
					{
						submitting: false,
					},
					() => {
						this.props.updateUser(user);
					}
				);
			})
			.catch((error) => {
				console.log("error", error);
				this.setState({
					submitting: false,
					errors: {
						base: error.status_message,
					},
				});
			});
	};

	onLogin = (e) => {
		e.preventDefault();
		const errors = this.validateFields();
		if (Object.keys(errors).length > 0) {
			this.setState((prevState) => ({
				errors: {
					...prevState.errors,
					...errors,
				},
			}));
		} else {
			this.onSubmit();
		}
	};

	getClassForInput = (key) =>
		classNames("form-control", {
			invalid: this.state.errors[key],
		});

	render() {
		const { username, password, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Authentication
          </h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={this.getClassForInput("username")}
              id="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={this.getClassForInput("password")}
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Login
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {({ updateUser, updateSessionId }) => (
      <LoginForm
        updateUser={updateUser}
        updateSessionId={updateSessionId}
        {...props}
      />
    )}
  </AppContext.Consumer>
);
