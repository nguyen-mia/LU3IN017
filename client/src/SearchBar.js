import React from 'react'
import { withRouter, Link} from "react-router-dom";

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      keyword : ""
    };
		this.handleChange = this.handleChange.bind(this);
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
				{this.props.match.params.keyword ?
					<Link to={`/search/${this.state.keyword}`} onClick = { (event => this.props.handleSearch(this.state.keyword))} > Search2</Link>
					:
					<Link to={`/search/${this.state.keyword}`}> Search ! </Link>
				}
			</div>
				
		)
	}
}
export default withRouter(SearchBar);
