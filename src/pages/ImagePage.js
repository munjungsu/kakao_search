import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getImageList} from '../slices/ImageSlice';
import { TailSpin } from  'react-loader-spinner';
import style from '../assets/scss/style.module.scss';

import ImageView from '../components/ImageView';
import { useInView } from 'react-intersection-observer';
const ImagePage = ({query}) => {
    const {rt, rtmsg, item, loading} = useSelector((state)=>state.image);
    const dispatch = useDispatch();

    //페이지 번호 상태값 초기설정
    const [page, setPage] = React.useState(1);

    //무한 스크롤 관련
    const [ref, inView] = useInView();

    React.useEffect(()=> {
        setPage(1);
    }, [query]);

    React.useEffect(()=> {
        if(!loading){
            dispatch(getImageList({query : query, page : page}));
        }
    }, [dispatch, page]);

    React.useEffect(()=> {
        if(inView && !loading){
            setPage(page+1);
        }
    }, [inView]);
    return (
        <div>
             {loading && (
                <TailSpin
                 color="#00BFFF" 
                 height={80} 
                 width={80}
                 wrapperStyle={{
                     position: 'absolute',
                     left : '50%',
                     top : '50%',
                     marginTop: '-50%',
                     marginLeft : '-50%'
                 }} 
                 />
            )}
            {rt!==200 ? (
                <div className={style.errmsg}>
                    <h3>{rt} Error</h3>
                    <p>{rtmsg}</p>
                </div>
            ) : (
                <ImageView documents={item.documents} inview={ref} />
            )}
        </div>
    );
};

export default ImagePage;