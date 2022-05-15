import { Layout, Menu } from 'antd';
import {
  SettingOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import 'antd/dist/antd.min.css';
import './App.css';
import Sentiment from './charts/Sentiment';
import Income from './charts/Income';
import Facility from './charts/Facility';
import Unemployment from './charts/Unemployment';
import IncomeBiaxial from './charts/IncomeBiaxial';
import UnemploymentBiaxial from './charts/UnemploymentBiaxial';
import FacilityBiaxial from './charts/FacilityBiaxial';
import { Document, Page } from 'react-pdf';
import sysPDF from './sys.pdf';

const { Header, Sider, Content } = Layout;

const App =  () => {

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height:"100vh", backgroundColor: '#094183'}}>
        <div className="logo" style={{textAlign: 'center', marginTop: '20px'}}>
          <img src="https://d2h9b02ioca40d.cloudfront.net/0.7/assets/logo-105a9.svg"  alt="The University of Melbourne homepage"/>
        </div>
        <Menu
          style={{marginTop: "40px", backgroundColor: '#094183'}}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: 'Analysis',
              children: [
                {
                  key: '1.1',
                  label: 'Overview',
                  icon: <Link to='/'></Link>
                },
                {
                  key: '1.2',
                  label: 'Average Income',
                  icon: <Link to='/income'></Link>
                },
                {
                  key: '1.3',
                  label: 'Unemployment Rate',
                  icon: <Link to='/unemployment'></Link>
                },
                {
                  key: '1.4',
                  label: 'Facility Number',
                  icon: <Link to='/facility'></Link>
                },
                
              ]
            },
            {
              key: '2',
              icon: <Link to='/system'><SettingOutlined /></Link>,
              label: 'System',
            },
            {
              key: '3',
              icon: <Link to='/about'><InfoCircleOutlined /></Link>,
              label: 'About',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
            style={{ fontSize: '16px', color: '#08c' }}
          })} */}
          {collapsed 
          ? <MenuUnfoldOutlined className='trigger' onClick={toggle} style={{ fontSize: '26px', marginLeft: '20px' }}/>
          : <MenuFoldOutlined className='trigger' onClick={toggle} style={{ fontSize: '26px', marginLeft: '20px'  }}/>}
          

        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* <BarCompare/> */}
          {/* <BarDoubleY /> */}
          <Routes>
            <Route path='/' element={
              <div className='chart-container'>
                <div className='chart-row'>
                  <Sentiment/>
                  <Income/>
                </div>
                <div className='chart-row'>
                  <Unemployment/>
                  <Facility/>
                </div>
              </div>
            }/>
            <Route path='/income' element={<IncomeBiaxial/>}/>
            <Route path='/unemployment' element={<UnemploymentBiaxial/>}/>
            <Route path='/facility' element={<FacilityBiaxial/>}/>
            <Route path='/about' element={
              <object width="100%" height="100%" data={sysPDF} type="application/pdf"></object>
              }
            />
          </Routes>
          
        </Content>
      </Layout>
    </Layout>
    </Router>
  );
}

export default App;