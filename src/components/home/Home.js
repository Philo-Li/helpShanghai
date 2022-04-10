import React, { useState } from 'react';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import Discover from '../discover/Discover';
import HelpShanghaiInfo from '../discover/HelpShanghai';
import AllArticlesList from './AllArticlesList';
import AllEmergencyList from './AllEmergencyList';
import AllSOSList from './AllSOSList';
// import RecommendArticles from './RecommendArticles';

const Home = () => {
  const [key, setKey] = useState('home');

  return (
    <div>
      <div>
        <Carousel>
          <Carousel.Item>
            <div className="jumbotron-slice-1" alt="First slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">封禁期物资信息共享互助平台</h3>
              <p className="jumbotron-subheader">人类就该相互帮助</p>
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
          <Tab eventKey="home" title="自救互助指南（必读）">
            {/* <RecommendArticles /> */}
            <HelpShanghaiInfo />
          </Tab>
          <Tab eventKey="all-list" title="各区物资互助信息（实时更新）">
            <AllArticlesList />
          </Tab>
          <Tab eventKey="urgent" title="紧急求助列表">
            <AllEmergencyList />
          </Tab>
          <Tab eventKey="sos" title="老弱病残孕紧急通道">
            <AllSOSList />
          </Tab>
          <Tab eventKey="mental-health" title="心理健康">
            <Discover />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
