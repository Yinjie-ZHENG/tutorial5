import React from 'react';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDel from './IssueDel.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
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

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }
  
  /* My try on delIssue()*/
  async deleteIssue(index) {
    const query = `mutation issueDel($id: Int!){
      issueDel(id: $id)
    }`;
    const {issues} = this.state;
    const newIssueList = this.state.issues.slice();
    const delList = newIssueList.filter(x => x.id == index);
    const mapList = newIssueList.filter(x => x.id != index);
    if (mapList.toString() != newIssueList.toString()){
      const {id} = delList[0];/*issues[index-1];*/
      const data = await graphQLFetch(query,{id})
      this.loadData();
    }
    else{
      alert("Please enter correct serial No.")
    }
    
    

  }

  render() {
    const { issues } = this.state;
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <IssueDel deleteIssue={this.deleteIssue} />
      </React.Fragment>
    );
  }
}
