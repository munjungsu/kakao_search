import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import qs from 'qs';

import style from './assets/scss/style.module.scss';
import Meta from './components/Meta';
import Top from './components/Top';
import BlogPage from './pages/BlogPage';
import WebPage from './pages/WebPage';
import CafePage from './pages/CafePage';
import ImagePage from './pages/ImagePage';
import BookPage from './pages/BookPage';

function App() {
  const {search} = useLocation();
  const {query} = qs.parse(search, {ignoreQueryPrefix : true});
  return (
    <div className={style.container}>
        
        <Meta />
        
        <Top />
        
        <Routes>
          <Route path="/blog" element={<BlogPage query={query}/>}/>
          <Route path="/book" element={<BookPage query={query}/>}/>
          <Route path="/cafe" element={<CafePage query={query}/>}/>
          <Route path="/image" element={<ImagePage query={query}/>}/>
          <Route path="/web" element={<WebPage query={query}/>}/>
        </Routes>
    </div>
  );
}

export default App;
