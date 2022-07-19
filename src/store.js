import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import BlogSlice from './slices/BlogSlice';
import WebSlice from './slices/WebSlice';
import CafeSlice from './slices/CafeSlice';
import BookSlice from './slices/BookSlice';
import ImageSlice from './slices/ImageSlice';
// Slice 오브젝트 참조 구문 명시 위치 const logger = createLogger();
const logger = createLogger();
const store = configureStore({
    // 개발자가 직접 작성한 Slice 오브젝트들이 명시되어야 한다. reducer: {
    reducer: {
        'web' : WebSlice,
        'blog' : BlogSlice,
        'image' : ImageSlice,
        'cafe' : CafeSlice,
        'book' : BookSlice,
    },    
   
    //미들웨어를 사용하지 않을 경우 이 라인 생략 가능
    middleware: [...getDefaultMiddleware({serializableCheck: false}), logger], // redux-devtools-extension을 사용하지 않을 경우 false 혹은 이 라인 명시 안함 devTools: true
    });
    export default store;