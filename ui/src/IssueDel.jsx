import React from 'react';
import PropTypes from 'prop-types';

export default class IssueDel extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueDel;
    const myid = parseInt(form.id.value);
   
    const { deleteIssue } = this.props;
    console.log("in issueDel");
    console.log(myid);
    deleteIssue(myid);
    form.id.value = '';
  }

  render() {
    return (
      <form name="issueDel" onSubmit={this.handleSubmit}>
        <input type="text" name="id" placeholder="ID to delete" />
        <button type="submit">Delete</button>
      </form>
    );
  }
}

IssueDel.propTypes = {
    deleteIssue: PropTypes.func.isRequired,
};
