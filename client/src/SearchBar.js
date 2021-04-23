import React from 'react'
import axios from 'axios';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      keyword : "",
      status : "",
      message : []
    };
		this.handleChange = this.handleChange.bind(this);
	}
	
	search(){
		const api = axios.create({
			baseURL : '/api/',
			timeout : 1000,
			headers : {'X-Custom-Header' : 'foobar'}
			});
		api.get(`messages/search/${this.state.keyword}`, {})
		.then(response => {
			this.setState({
                keyword : "",
                messages : response.data
            })
            this.props.handleSearchMessage(response.data)
		});
	}

	handleChange(event = {}) {
		const name = event.target && event.target.name;
		const value = event.target && event.target.value;
		this.setState({[name]:value});
	}


	render(){
		return (
			<div>
				<div>Search</div>
				<input
					type="text"
					placeholder="Search anything.."
					name="keyword"
					onChange={this.handleChange}
					value={this.state.keyword}
				/>
				<button onClick = { (event => this.search()) } >
                Search!
                </button>
			</div>
				
		)
	}
}
export default SearchBar;
