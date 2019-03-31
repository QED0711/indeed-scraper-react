import React, { Component } from 'react';
import './App.css';

// MODULES
import { Fetch } from 'react-request';

// COMPONENTS
import SearchForm from './components/SearchForm';


//  JS
import queryJobs from './js/queryJobs';
import sendFetch from './js/fetchTest';

class App extends Component {
  
  constructor(){
    super();

    this.state = {
      userURL: null,
    }

    this.setUserURL = this.setUserURL.bind(this);
  }

  setUserURL(userURL){
    this.setState({userURL});
  }

  render() {
    return (
      <div className="App">
        <SearchForm setUserURL={this.setUserURL} />

        {
          this.state.userURL &&
          queryJobs(this.state.userURL)
        }

        {/* <Fetch url="https://www.indeed.com/jobs?q=Music&l=Columbus+OH&start=0">
        {
          ({fetching, faild, data}) => {
            if(fetching){
              return(<div>Loading Data...</div>)
            }

            if(faild){
              return(<div>Faild to load</div>)
            }
            if(data){
              console.log(data)
              return(<div>SUCCEEDED!!!</div>)
            }
          }
        }

        </Fetch> */}
      </div>
    );
  }
}

export default App;
