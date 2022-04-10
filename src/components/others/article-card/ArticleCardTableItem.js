/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Card } from 'react-bootstrap';
import { format, formatDistance } from 'date-fns';
import '../../../mdb.css';

const emergencyRateMapReverse = { 1: '不紧急', 2: '紧急', 3: '危急' };

const ArticleCard = ({ article, setShowDetailsModal, setArticleDetailsToShow }) => {
  if (!article) return null;

  const publishedDate = format(new Date(article.createdAt), 'PP');
  const remianDays = formatDistance(new Date(article.surviveDate), new Date(), { addSuffix: true });
  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const { profileImage } = article.user;

  const statusBtnStyleMap = { 待解决: 'article-card-btn-status-1', 已解决: 'article-card-btn-status-2' };
  const statusBtnStyle = statusBtnStyleMap[article.status];

  const emergencyRateBtnStyleMap = {
    危急: 'article-card-btn-emergencyrate-1',
    紧急: 'article-card-btn-emergencyrate-2',
    不紧急: 'article-card-btn-emergencyrate-3',
  };
  const emergencyRate = emergencyRateMapReverse[article.emergencyRate];
  const emergencyRateBtnStyle = emergencyRateBtnStyleMap[emergencyRate];

  const handleClickShowModal = () => {
    setShowDetailsModal(true);
    setArticleDetailsToShow(article);
  };

  // <th>紧急程度</th>
  // <th>状态</th>
  // <th>城市</th>
  // <th>分类</th>
  // <th>生存指数</th>
  // <th>可提供</th>
  // <th>需要</th>
  // <th>详情</th>

  return (
    <tr className="grid-item">
      <td>
        <div className="article-card-table-item container-table-item">
          <div className={statusBtnStyle}>
            {article.status}
          </div>
        </div>
      </td>
      <td>
        <div className="article-card-table-item container-table-item">
          <div className={emergencyRateBtnStyle}>
            {emergencyRate}
          </div>
        </div>
      </td>
      <td>
        {article.address1}
      </td>
      <td>
        {article.type}
      </td>
      <td>
        {article.surviveDate}
        (
        {remianDays}
        )
      </td>
      <td>
        {article.provide}
      </td>
      <td>
        {article.need}
      </td>
      <td>
        <div className="article-card-table-item container-table-item">
          <button
            type="button"
            className="article-card-btn-primary article-card-date"
            onClick={() => handleClickShowModal()}
          >
            <div className="article-card-table-item">
              查看详情
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ArticleCard;
