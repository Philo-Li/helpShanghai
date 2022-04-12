import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import file from '../../file/handbook.md';

const Handbook = () => {
  const [content, setContent] = useState({ md: '' });

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((md) => {
        setContent({ md });
      });
  }, []);

  return (
    <div className="margin-top-2rem container-col-article-details">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.md}</ReactMarkdown>
    </div>
  );
};

export default Handbook;
