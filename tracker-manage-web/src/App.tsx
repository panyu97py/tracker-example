import React from 'react';
import {EventConfigManage} from "@/routes/event-config-manage";
import {EventDataTrend} from "@/routes/event-data-trend";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from "./components/layout";
import './App.css';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventConfigManage />} />
          <Route path="/trend/:id" element={<EventDataTrend />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
