import React from 'react';

function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.owner}</td>
      <td>{issue.title}</td>
      <td>{issue.created.toLocaleString('en-GB',{timeZone:'UTC'})}</td>

      <td><a href={`/#/edit/${issue.id}`}>Edit</a></td>
    </tr>
  );
}

export default function IssueTable({ issues }) {
  const issueRows = issues.map(issue => (
    <IssueRow key={issue.id} issue={issue} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID/Serial No.</th>
          <th>Owner/Name</th>
          <th>Title/Phone</th>
          <th>Created/Timestamp</th>

        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}
