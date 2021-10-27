import React from 'react';
import graphQLFetch from './graphQLFetch.js';

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {date: new Date()};
      }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    componentWillUnmount() {
        clearInterval(this.timerID);
      }
    tick() {
        this.setState({
          date: new Date()
        });
      }
    
    render() {
        
        const mytime = this.state.date.toLocaleString('en-GB',{timeZone:'UTC'})
      return (
        <div><h1>{mytime}</h1></div>
      );
    }
  }

export default class DisplayHomepage extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        /*this.createIssue = this.createIssue.bind(this);*/
      }

      componentDidMount() {
        this.loadData();
      }
      async loadData() {
        const query = `query {
          issueList {
            id title status owner
            created effort due
          }
        }`;
    
        const data = await graphQLFetch(query);
        if (data) {
          this.setState({ issues: data.issueList });
        }
      }

    render() {
    const  issueslength  = 25 - this.state.issues.length;
      return (
        <React.Fragment>
        <h1 >Homepage</h1>
        <Clock />
        <h1 >Now available freeslots: {issueslength}</h1>
        </React.Fragment>
      );
    }
  }