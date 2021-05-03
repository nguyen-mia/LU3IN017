import React from 'react'
import { withRouter, Link} from "react-router-dom";

import styles from './css/SearchBar.module.css';


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
			<div class={styles.search__container}>
				<input class={styles.search__input} 
					type="text"
					placeholder="Search Gryphon"
					name="keyword"
					onChange={this.handleChange}
					value={this.state.keyword}
				/>
				<Link class={styles.search__button}to={`/search/${this.state.keyword}`}> Search</Link>

				
				
			</div>
				
		)
	}
}
export default withRouter(SearchBar);
