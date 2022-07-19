import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getWebList} from '../slices/WebSlice';
import { TailSpin } from  'react-loader-spinner';
import style from '../assets/scss/style.module.scss';
import Listview from '../components/Listview';

import {useInView} from 'react-intersection-observer';

const WebPage = ({query}) => {

    //페이지 번호 상태값 초기설정
    const [page, setPage] = React.useState(1);

    //무한 스크롤 관련
    const [ref, inView] = useInView();

    const {rt, rtmsg, item, loading} = useSelector((state)=>state.web);
    const dispatch = useDispatch();

    
    React.useEffect(()=> {
        setPage(1);
    }, [query]);

    React.useEffect(()=> {
        if(!loading){
            dispatch(getWebList({query : query, page : page}));
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
                <Listview documents={item.documents} thumb={false} inview={ref}/>
            )}
        </div>
    );
};

export default WebPage;