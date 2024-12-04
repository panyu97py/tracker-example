import React from 'react';
import {EventConfigManage} from "@/routes/event-config-manage";
import {EventDataTrend} from "@/routes/event-data-trend";
import {PageContainer} from "@ant-design/pro-components";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div style={{background: '#F5F7FA'}}>
      <PageContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EventConfigManage />} />
            <Route path="/trend/:id" element={<EventDataTrend />} />
          </Routes>
        </BrowserRouter>
      </PageContainer>
    </div>
  );
}

export default App;
