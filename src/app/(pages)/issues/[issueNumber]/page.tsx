import axios from "axios";
import React from "react";

const getIssueDetails = async (issueNumber: number) => {
  const { data: issueData } = await axios.get(
    `https://api.github.com/repos/angular/angular/issues/${issueNumber}`
  );
  return issueData;
};

async function PageIssue({
  params,
}: {
  params: Promise<{ issueNumber: string }>;
}) {
  const issueNumber = (await params).issueNumber;

  const issueData = await getIssueDetails(Number.parseInt(issueNumber));

  return (
    <div className="issue-details">
      <p>{issueData?.title}</p>
    </div>
  );
}

export default PageIssue;
