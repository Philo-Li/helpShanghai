/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import '../../../mdb.css';

const emergencyRateMapReverse = { 1: '不紧急', 2: '紧急', 3: '危急' };
const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const ArticleDetailsCard = ({ article }) => {
  if (!article) return null;
  const publishedDate = format(new Date(article.createdAt), 'PP');
  const userId = localStorage.getItem('userId');

  const statusBtnStyleMap = { 待解决: 'article-card-btn-status-1', 已解决: 'article-card-btn-status-2' };
  const statusBtnStyle = statusBtnStyleMap[article.status];

  const emergencyRateBtnStyleMap = {
    危急: 'article-card-btn-emergencyrate-1',
    紧急: 'article-card-btn-emergencyrate-2',
    不紧急: 'article-card-btn-emergencyrate-3',
  };
  const emergencyRate = emergencyRateMapReverse[article.emergencyRate];
  const emergencyRateBtnStyle = emergencyRateBtnStyleMap[emergencyRate];
  const contact = article && article.contact;

  const handleClickOpenDetails = () => {
    window.open(`https://helpshanghai.com/article/${article.id}`);
  };

  return (
    <div className="grid-item">
      <div className="p-3 article-card">
        <Card key={article.id}>
          <Card.Title>
            <div className="article-card">
              <a href={`/article/${article.id}`}>
                <div className="article-card-title">
                  {article.title}
                </div>
              </a>
            </div>
            <div className="container-row-primary">
              <div className="article-card-summary">
                分类：
                {article.type}
              </div>
            </div>
            <div className="container-row-primary">
              <div className={statusBtnStyle}>
                {article.status}
              </div>
              <div className={emergencyRateBtnStyle}>
                {emergencyRate}
              </div>
            </div>
            <div className="container-row-primary">
              <a href={`/@${article.user.username}`}>
                <div className="">
                  <img src={initProfileImage} alt="user avatar" className="article-card-author article-card-author-avatar" />
                </div>
              </a>
              <a href={`/@${article.user.username}`}>
                <div className="article-card-author-name">{`${article.user.firstName} ${article.user.lastName || ''}`}</div>
              </a>
              <div className="article-card-date">{publishedDate}</div>
            </div>
            <div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  详细地址：
                  {article.fullAddress}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  可以提供：
                  {article.provide}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  需要：
                  {article.need}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  联系方式：
                  {article.contact
                    ? contact
                    : '未填写'}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  备注：
                  {article.note}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  创建日期：
                  {article.createdAt}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-summary">
                  最后更新日期：
                  {article.updatedAt}
                </div>
              </div>
              <div className="container-row-primary">
                <div className="article-card-table-item container-table-item">
                  <button
                    type="button"
                    className="article-card-btn-primary article-card-date"
                    onClick={() => handleClickOpenDetails()}
                  >
                    <div className="article-card-btn-emergencyrate-3">
                      去评论
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="container-article-card-bookmark">
              <div className="article-card-summary">
                标签：
                {article.tag || '无'}
              </div>
            </div>
          </Card.Title>
        </Card>
      </div>
    </div>
  );
};

export default ArticleDetailsCard;
