"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/app/components/pagination";

const getRepoDetails = async () => {
  const repoUrl = "https://api.github.com/repos/angular/angular";
  const { data: repoDetails } = await axios.get(repoUrl);
  return repoDetails;
};

const getIssuesData = async (query: string, pageNumber: number) => {
  const issuesUrl = "https://api.github.com/search/issues";
  const params = {
    q: query || "angular/angular",
    per_page: 5,
    page: pageNumber,
    repo: "angular/angular",
  };
  const { data: issuesData } = await axios.get(issuesUrl, {
    params,
  });
  return issuesData;
};

function IssuesPage() {
  const [repoDetails, setRepoDetails] = useState();
  const [issuesData, setIssuesData] = useState();
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    getRepoDetails().then((repoDetails) => {
      setRepoDetails(repoDetails);
    });
  }, [query]);

  useEffect(() => {
    getIssuesData(query, pageNumber).then((issuesData) => {
      console.log(issuesData);
      setIssuesData(issuesData);
    });
  }, [query, pageNumber]);

  return (
    <div className="issues-pag p-8">
      <div className="repo-details">
        <p className="font-semibold">
          {repoDetails?.owner?.login} / {repoDetails?.name}
        </p>
      </div>
      <div className="search-bar m-2 mt-8">
        <input
          type="text"
          className="w-full border-[1px] p-4"
          placeholder="Search for issues ..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div className="issues-data">
        <div className="issues-heading">
          <p className="font-bold text-2xl m-2 mb-1 p-4 pl-0">
            {" "}
            {repoDetails?.open_issues_count} Open{" .. "}
            {issuesData?.total_count - repoDetails?.open_issues_count} Closed
          </p>
        </div>
        <div className="issues-table flex flex-col ga-2">
          {issuesData?.items?.map((issueItem, idx) => {
            return (
              <a
                key={idx}
                className="m-2 border-[1px] p-4"
                href={`/${issueItem?.number}`}
              >
                {issueItem?.title}
              </a>
            );
          })}
        </div>

        <div className="pagination-section flex justify-center items-center">
          <Pagination value={pageNumber} onChange={setPageNumber} />
        </div>
      </div>
    </div>
  );
}

export default IssuesPage;
