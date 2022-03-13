import React from 'react';
import { Card } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { format } from 'date-fns';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const PhotoCard = ({
  photo, likeSinglePhoto,
}) => {
  if (!photo) return null;

  const thumb = photo.thumb || 'https://cdn.philoart.io/b/700x700/ejt2Vbza56UViZTf2vEHY.jpg';

  const bgColor = photo.color || '#84B0B3';

  const mystyle = {
    backgroundColor: bgColor,
  };

  const Placeholder = () => (
    <div style={mystyle}>
      <a href={`/article/${photo.id}`}>
        <img
          src={thumb}
          className="lazyload-img"
          width="100%"
          alt="gird item"
        />
      </a>
    </div>
  );
  const publishedDate = format(new Date(photo.publishedAt), 'PP');
  // console.log('article', photo, publishedDate, photo.publishedAt);
  const profileImage = 'https://cdn.philoart.io/1/700x700/vQAgad7txFp8EhHrq8qTW-avatar.jpg';

  return (
    <div className="grid-item">
      <div className="p-3">
        <Card key={photo.id}>
          <LazyLoad
            height={300}
            offset={[-100, 0]}
            debounce={500}
            once
            placeholder={<Placeholder />}
          >
            <div className="photo-card overlay">
              <a href={`/article/${photo.id}`}>
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
              <a href={`/article/${photo.id}`}>
                <div className="article-card-title">
                  {photo.title}
                </div>
                {/* <div className="article-card-summary">
                  summaryWhen we talk about web3, I suspect most people in tech
                  instantly think about NFTs, cryptocurrency,
                  or DeFi. I can’t blame them there: judging by...
                </div> */}
                <div className="article-card-summary">
                  {photo.summary}
                </div>
              </a>
            </div>
            <div className="container-row-primary">
              <div className="">
                <img src={profileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
              </div>
              <div className="article-card-author-name">{photo.author || 'Philo'}</div>
              <div className="article-card-date">{publishedDate}</div>
            </div>
            <div className="container-article-card-bookmark">
              <div className="article-card-bookmark-btn-end">
                <button
                  type="button"
                  className="article-card-btn-bookmark article-card-btn-item"
                  onClick={() => likeSinglePhoto(photo)}
                >
                  <div className="">
                    {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />)}
                    {photo.isLiked && (
                      <div className="yellow-icon">
                        <i className={photo.isLiked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
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

export default PhotoCard;
