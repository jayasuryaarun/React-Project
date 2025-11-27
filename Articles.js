import React, { useState, useEffect } from "react";

function Articles({ articles }) {
  const [sortedArticles, setSortedArticles] = useState(
    [...articles].sort((a, b) => b.upvotes - a.upvotes)
  );

  const sortByVotes = () => {
    const sorted = [...articles].sort((a, b) => b.upvotes - a.upvotes);
    setSortedArticles(sorted);
  };

  const sortByDate = () => {
    const sorted = [...articles].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedArticles(sorted);
  };

  // 👇 Hook into App.js buttons by test IDs
  useEffect(() => {
    const upvoteBtn = document.querySelector('[data-testid="most-upvoted-link"]');
    const recentBtn = document.querySelector('[data-testid="most-recent-link"]');

    if (upvoteBtn) upvoteBtn.addEventListener("click", sortByVotes);
    if (recentBtn) recentBtn.addEventListener("click", sortByDate);

    // Cleanup
    return () => {
      if (upvoteBtn) upvoteBtn.removeEventListener("click", sortByVotes);
      if (recentBtn) recentBtn.removeEventListener("click", sortByDate);
    };
  }, [articles]);

  return (
    <div className="card w-50 mx-auto article">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((article, index) => (
            <tr data-testid="article" key={index}>
              <td data-testid="article-title">{article.title}</td>
              <td data-testid="article-upvotes">{article.upvotes}</td>
              <td data-testid="article-date">{article.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
