import React from 'react';
import TagBar from './TagBar';

const RelatedTagBar = ({ allArticles }) => {
  if (allArticles === undefined) return null;

  if (allArticles.length === 0) {
    return (
      <div className="p-3 flex-center">
        <h3>No result</h3>
      </div>
    );
  }

  const article = allArticles[1] || allArticles[0];
  const tags1 = article.tag;

  if (!tags1) return null;

  let tags = tags1.split(',');

  if (tags.length > 10) {
    tags = tags.slice(0, 10);
  }

  return (
    <div>
      <h5 className="p-3 container-row-tag">Related tags</h5>
      <TagBar tagToShow={tags} />
    </div>
  );
};

export default RelatedTagBar;
