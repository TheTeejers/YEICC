import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          info:[]
    }

    this.getIssues = this.getIssues.bind(this);
    // this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  getIssues() {
    axios.get(`https://api.github.com/repos/rails/rails/issues?q=is%3Aopen+is%3Aissue+no%3Aassignee`)
    .then((response) => {
      console.log('I SHOULD HAVE SEARCH RESULTS');
      if (response.data ==='ERROR') {
        alert('Error in fetching data from the Rails Issues API')
      } else {
        console.log(response.data)
        let newIssues = response.data
        for (var i = 0; i < newIssues.length; i++) {
          this.setState({
            info: newIssues,
            // info:[
            //   {
            //     title: newIssues[i].title,
            //     milestone: newIssues[i].milestone,
            //     url: newIssues[i].url,
            //     html_url: newIssues[i].html_url,
            //     state: newIssues[i].state,
            //     user:{
            //       login: newIssues[i].user.login,
            //       html_url: newIssues[i].user.html_url,
            //       avatar_url: newIssues[i].user.avatar_url
            //     },
            //     comments: newIssues[i].comments
            //   }
            // ]
          })
        }
        console.log(newIssues)

      }
    })
  }


  handleSubmit(event) {
    event.preventDefault();
    this.getIssues();
  }



  render() {
    // console.log(this.state.info.length, 'in render')
    // console.log(this.state.info, 'in render')
    const child = this.state.info.map((issuesData, i) => {
            // console.log(issuesData.title)
      return <div key={i}>
      <p>{issuesData.title}</p>
      <p>{issuesData.state}</p>
      <p>{issuesData.comments}</p>
      <p>{issuesData.user.avatar_url}</p>
      <p>{issuesData.user.html_url}</p>
      <p>{issuesData.user.login}</p>
      <p>{issuesData.url}</p>
      <p>{issuesData.html_url}</p>
      <hr/>

    </div>
    })

    return (

      <div className="App">

        <form onSubmit={this.handleSubmit}>
          <button className='searchButton' onSubmit={this.handleSubmit}>Search Issues</button>
        </form>
              <div>{child}</div>
      </div>

    );
  }
}

export default App;
