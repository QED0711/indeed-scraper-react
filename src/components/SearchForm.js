import React, {Component} from 'react';


class SearchForm extends Component {
    constructor(props){
    super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const userURL = document.getElementById("userURL").value;
        this.props.setUserURL(userURL);
    }


    render(){
        
        return(
            <form id="job-search-form" onSubmit={this.handleSubmit}>
                <input type="text" id="userURL" />
                <br/>
                <input type="submit" value="Find Jobs" />
            </form>
        )
    }
}


export default  SearchForm;