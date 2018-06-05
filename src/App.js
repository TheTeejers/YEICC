import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          info:[],
          clicks: 1,
          show: true
    }

    this.getIssues = this.getIssues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrior = this.onClickPrior.bind(this);
    this.enableButtons = this.enableButtons.bind(this);
  }

// This get the data from the repo
  getIssues() {
    axios.get(`https://api.github.com/repos/rails/rails/issues?q=is%3Aopen&is%3Aissue&no%3Aassignee&page=${this.state.clicks}&per_page=${this.refs.per_page_seed.value}${this.refs.issue_order_seed.value}${this.refs.issue_components_seed.value}`)

    .then((response) => {
      this.setState({
        clicks: this.state.clicks
      })
      console.log(this.state.clicks, "page on right now1")
      if (response.data ==='ERROR') {
        alert('Error in fetching data from the Rails Issues API')
      } else {
        let newIssues = response.data
        for (var i = 0; i < newIssues.length; i++) {
          this.setState({
            info: newIssues,
          })
        }
      }
    })
  }

  enableButtons() {
    document.getElementById('pageButtonsNext').removeAttribute('hidden');
    document.getElementById('pageButtonsPrior').removeAttribute('hidden');

  }

  handleSubmit(event) {
    this.enableButtons();
    event.preventDefault();
    this.getIssues();
    console.log(this.refs.issue_order_seed.value)
    console.log(this.refs.issue_components_seed.value)
  }


  onClickNext(event) {
    this.setState({
      clicks: this.state.clicks + 1
    })
    this.getIssues();
  }


  onClickPrior(event) {
    console.log('STOP ADDING!')
    if (this.state.clicks > 0) {
      this.setState({
        clicks: this.state.clicks - 1
      })
    } else {
      alert('This is the first page')
      console.log(this.state.clicks)
    }
    this.getIssues();
  }

  render() {

  //populates the screen with information
    const populate = this.state.info.map((issuesData, i) => {
      return <div className='displayArea' key={i}>
        <div className='returnedData' key={i}>
          <h2><a className='title' href={issuesData.html_url}>{issuesData.title}</a></h2>
          <p className='underData createdAtText'>Created at:</p>
          <p className='underData createdAtDate'>{issuesData.created_at}</p>
          <p className='underData'>Number of Comments: {issuesData.comments}</p>
          <p className='underData'> User Submitted: <a href={issuesData.user.html_url}><img className='underData userImage' src={issuesData.user.avatar_url} alt='user avatar'/>{issuesData.user.login}</a></p>
        </div>
      </div>
    })

    return (

      <div className="App">
        <header><img className='yeiLogo' src='youearnedit.png' alt='you earned it logo'/></header>
        <form className='searchBox' onSubmit={this.handleSubmit}>
          <div>
            <span>Issue Labels: </span>
            <select id='issue_components' ref='issue_components_seed'>
              <option value=''>All</option>
              <option value='&labels=ActionCable'>ActionCable</option>
              <option value='&labels=ActionMailer'>ActionMailer</option>
              <option value='&labels=ActionPack'>ActionPack</option>
              <option value='&labels=ActionView'>ActionView</option>
              <option value='&labels=ActiveJob'>ActiveJob</option>
              <option value='&labels=ActiveModel'>ActiveModel</option>
              <option value='&labels=ActiveRecord'>ActiveRecord</option>
              <option value='&labels=ActiveStorage'>ActiveStorage</option>
              <option value='&labels=ActiveSupport'>ActiveSupport</option>
              <option value='&labels=Asset Pipeline'>Asset Pipeline</option>
            </select>
          </div>
          <div>
            <span>Order: </span>
            <select id='issue_order' ref='issue_order_seed'>
              <option value=''>Default</option>
              <option value='&sort=comments-desc'>Most Commented</option>
              <option value='&sort=comments-asc'>Least Commented</option>
            </select>
          </div>
          <div>
          <span>Issues returned: </span>
            <select id='per_page' ref='per_page_seed'>
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
              <option value='250'>250</option>
            </select>
          </div>
          <button className='searchButton' onSubmit={this.handleSubmit}>Search Issues</button>
        </form>
        <div>{populate}</div>
        <div className='buttonNavigation'>
          <button id='pageButtonsPrior' onClick={this.onClickPrior} hidden>prior</button>
          <button id='pageButtonsNext' onClick={this.onClickNext} hidden>next</button>
        </div>
      </div>
    );
  }
}

export default App;
