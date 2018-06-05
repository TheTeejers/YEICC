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
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    // axios.get(`https://api.github.com/repos/rails/rails/issues?q=is%3Aopen&is%3Aissue&no%3Aassignee&per_page=${this.refs.per_page_seed.value}&sort%3Acomments-desc`)

  getIssues() {
    axios.get(`https://api.github.com/repos/rails/rails/issues?q=is%3Aopen&is%3Aissue&no%3Aassignee&per_page=${this.refs.per_page_seed.value}`)

    .then((response) => {
      if (response.data ==='ERROR') {
        alert('Error in fetching data from the Rails Issues API')
      } else {
        console.log('I SHOULD HAVE SEARCH RESULTS');
        console.log(response.data)
        let newIssues = response.data
        for (var i = 0; i < newIssues.length; i++) {
          this.setState({
            info: newIssues,
          })
        }
      }
    })
  }


  handleSubmit(event) {
    event.preventDefault();
    this.getIssues();
    console.log(this.refs.issue_order_seed.value)
  }



  render() {

    const populate = this.state.info.map((issuesData, i) => {
      return <div key={i}>
      <h3><a href={issuesData.html_url}>{issuesData.title}</a></h3>
      <p>Created at: {issuesData.created_at}</p>
      <p>Comments: {issuesData.comments}</p>
      <img src={issuesData.user.avatar_url} alt='user avatar'/>
      <p> User Submitted: <a href={issuesData.user.html_url}>{issuesData.user.login}</a></p>
      <hr/>

    </div>
    })

    return (

      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <select id='issue_components' ref='issue_components_seed'>
            <option value='All'>All</option>
            <option value='ActionCable'>ActionCable</option>
            <option value='ActionMailer'>ActionMailer</option>
            <option value='ActionPack'>ActionPack</option>
            <option value='ActionView'>ActionView</option>
            <option value='ActiveJob'>ActiveJob</option>
            <option value='ActiveModel'>ActiveModel</option>
            <option value='ActiveRecord'>ActiveRecord</option>
            <option value='ActiveStorage'>ActiveStorage</option>
            <option value='ActiveSupport'>ActiveSupport</option>
            <option value='Asset Pipeline'>Asset Pipeline</option>
          </select>
          <select id='issue_order' ref='issue_order_seed'>
            <option value=''>Default</option>
            <option value='+sort%3Acomments-desc'>Most Commented</option>
            <option value='+sort%3Acomments-asc'>Least Commented</option>
          </select>
          <select id='per_page' ref='per_page_seed'>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <button className='searchButton' onSubmit={this.handleSubmit}>Search Issues</button>
        </form>
        <div>{populate}</div>
      </div>

    );
  }
}

export default App;
