import React, { useState } from 'react';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import Discover from '../discover/Discover';
import Latest from './Latest';
import RecommendArticles from './RecommendArticles';

const Home = () => {
  const [key, setKey] = useState('home');

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
            <RecommendArticles />
          </Tab>
          <Tab eventKey="discover" title="Discover">
            <Discover />
          </Tab>
          <Tab eventKey="latest" title="Latest">
            <Latest />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
