import React from 'react';
import {EventConfigManage} from "@/routes/event-config-manage";
import {EventDataTrend} from "@/routes/event-data-trend";
import {Layout} from "@/components";
import './App.css';

function App() {
  return (
    <Layout>
      <Layout.Route title="事件管理" path="/" exact component={EventConfigManage} />
      <Layout.Route title="事件数据" path="/trend/:id" component={EventDataTrend} />
    </Layout>
  );
}

export default App;
