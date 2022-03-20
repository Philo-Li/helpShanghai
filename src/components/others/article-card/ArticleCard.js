import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { format } from 'date-fns';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const ArticleCard = ({ article }) => {
  if (!article) return null;
  const history = useHistory();
  const [showCollectModal, setShowCollectModal] = useState(false);

  const userId = localStorage.getItem('waldon-userId');
  const thumb = article.thumb || 'https://cdn.philoart.io/b/700x700/ejt2Vbza56UViZTf2vEHY.jpg';

  const bgColor = article.color || '#84B0B3';

  const mystyle = {
    backgroundColor: bgColor,
  };

  const Placeholder = () => (
    <div style={mystyle}>
      <a href={`/article/${article.id}`}>
        <img
          src={thumb}
          className="lazyload-img"
          width="100%"
          alt="gird item"
        />
      </a>
    </div>
  );

  const openCollectModal = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  const publishedDate = format(new Date(article.publishedAt), 'PP');
  // console.log('article', article, publishedDate, article.publishedAt);
  const profileImage = 'https://cdn.philoart.io/1/700x700/vQAgad7txFp8EhHrq8qTW-avatar.jpg';

  return (
    <div className="grid-item">
      <div className="p-3">
        <Card key={article.id}>
          <LazyLoad
            height={300}
            offset={[-100, 0]}
            debounce={500}
            once
            placeholder={<Placeholder />}
          >
            <div className="article-card overlay">
              <a href={`/article/${article.id}`}>
                <img
                  src={thumb}
                  width="100%"
                  alt="gird item"
                />
              </a>
            </div>
          </LazyLoad>
          <Card.Title>
            <div className="article-card">
              <a href={`/article/${article.id}`}>
                <div className="article-card-title">
                  {article.title}
                </div>
                <div className="article-card-summary">
                  {article.summary}
                </div>
              </a>
            </div>
            <div className="container-row-primary">
              <div className="">
                <img src={profileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
              </div>
              <div className="article-card-author-name">{article.author || 'Philo'}</div>
              <div className="article-card-date">{publishedDate}</div>
            </div>
            <div className="container-article-card-bookmark">
              <div className="article-card-bookmark-btn-end">
                {userId && (
                <SaveToCollectionsModal
                  article={article}
                  showCollectModal={showCollectModal}
                  setShowCollectModal={setShowCollectModal}
                />
                )}
                <button
                  type="button"
                  className="article-card-btn-bookmark article-card-btn-item"
                  onClick={() => openCollectModal()}
                >
                  <div className="">
                    {!article.isCollected && (<i className={article.isCollected ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />)}
                    {article.isCollected && (
                      <div className="yellow-icon">
                        <i className={article.isCollected ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </Card.Title>
        </Card>
      </div>
    </div>
  );
};

export default ArticleCard;
