import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import {
    DollarCircleOutlined,
    OrderedListOutlined,
    SolutionOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import Balance from './components/Balance/';
import "./assets/fonts/index.css";
import {Link} from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Routes/index"

function App() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    const [selectedMenu, selectMenu] = useState('1');

    function handleMenuClick(e){
        selectMenu(e.key)
    }
  return (
    <div id="App">
      <Router>
          <Layout id="Layout">
              <Sider
                  breakpoint="lg"
                  collapsedWidth="0"
                  id="Menu"
              >
                  <Menu mode={"inline"} selectedKeys={[selectedMenu]}>
                      <Menu.Item key="1" onClick={handleMenuClick}>
                          <Link to="/balance">
                            <DollarCircleOutlined />
                            <span>Balance</span>
                          </Link>
                      </Menu.Item>
                      <SubMenu
                          key="sub1"
                          title={<span>
                          <OrderedListOutlined/>
                          <span>Orders</span>
                      </span>}
                      >
                          <Menu.Item key="sub-item1">WOW Classic</Menu.Item>
                          <Menu.Item key="sub-item2">WOW BFA</Menu.Item>
                          <Menu.Item key="sub-item3">Fortnite</Menu.Item>
                          <Menu.Item key="sub-item4">Hearthstone</Menu.Item>
                      </SubMenu>
                      <Menu.Item key="3">
                          <SolutionOutlined />
                          <span>My info</span>
                      </Menu.Item>
                      <Menu.Item key="4" onClick={handleMenuClick}>
                          <Link to="/form">
                              <CalendarOutlined />
                              <span>Schedule</span>
                          </Link>
                      </Menu.Item>
                  </Menu>
              </Sider>
              <Layout id="Content">
                  {/*<Balance/>*/}
                  <Routes/>
              </Layout>
          </Layout>
      </Router>
    </div>
  );
}

export default App;
