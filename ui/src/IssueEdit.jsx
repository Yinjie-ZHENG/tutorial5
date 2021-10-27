import React from 'react';

export default function IssueEdit({ match }) {
  const { id } = match.params;
  return (
    <h2>{`This is issue ${id},now I want to delete it!`}</h2>
  );
}
