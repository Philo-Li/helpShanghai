import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import useArticles from '../../hooks/useArticles';
import HomeArticleList from '../others/list/HomeArticleList';
// import CategoryBar from '../others/CategoryBar';
import Discover from '../discover/Discover';
import config from '../../config';
// import '../../MDB-Free_4.19.2/css/mdb.css';

const Home = () => {
  const [allArticles, setAllArticles] = useState();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('home');

  const userId = localStorage.getItem('philoart-userId');
  // const baseUrl = 'https://media.philoart.io/articles.json';

  const variables = {
    username: config.admin,
    checkUserLike: userId,
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
    } else {
      // const temp = await axios.get(baseUrl).then((res) => res.data.node);

      // setAllArticles(temp);
    }
    console.log(articles);
  }, [articles]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div>
      <div>
        <Carousel fade>
          <Carousel.Item>
            <div className="jumbotron-slice-1" alt="First slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Share your artworks with the world.</h3>
              <p className="jumbotron-subheader">Create, and Post it</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-2" alt="Second slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Create, Mint, and Sell</h3>
              <p className="jumbotron-subheader">Discover the best NFTs.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-3" alt="Third slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Discover the best artworks.</h3>
              <p className="jumbotron-subheader">Free for personal use and download.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* <CategoryBar /> */}
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
  );
};

export default Home;
