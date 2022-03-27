import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/list/HomeArticleList';
import Discover from '../discover/Discover';

const Home = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('home');

  const userId = localStorage.getItem('userId');

  const variables = {
    checkUserLike: userId,
    checkUserCollect: userId,
    first: 20,
  };

  const { articles, fetchMore, hasNextPage } = useArticles(variables);

  useEffect(async () => {
    if (articles) {
      const temp = articles && articles.edges
        ? articles.edges.map((edge) => edge.node)
        : [];

      setAllArticles(temp);
      setLoading(false);
    }
  }, [articles]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div>
      <div>
        <Carousel>
          <Carousel.Item>
            <div className="jumbotron-slice-1" alt="First slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Share your thoughts with the world.</h3>
              <p className="jumbotron-subheader">Create, and Post it</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container-margin-top">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <HomeArticleList
              allArticles={allArticles}
              setAllArticles={setAllArticles}
              clickFetchMore={clickFetchMore}
              loading={loading}
              hasNextPage={hasNextPage}
            />
          </Tab>
          <Tab eventKey="Recommend" title="Recommend">
            <Discover />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
