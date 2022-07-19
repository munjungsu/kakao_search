import React from 'react';
import dayjs from 'dayjs';

import style from '../assets/scss/style.module.scss';
import noimg from '../assets/img/noimg.png';

const Listview = ({documents, thumb, inview}) => {
    
    return (
        <ul className={style.mediaList}>
            {documents.map((item, index)=>(
                <li className={style.mediaItem} key={index} 
                {...(documents.length-1 === index ? {ref:inview} : {})}
                >
                    <a href={item.url} target="_blank" rel="noreferrer" className={thumb && style.thumbnail}>
                        {thumb && (
                            <img src={item.thumbnail ? item.thumbnail : noimg}
                            onError={(e)=>e.currentTarget.src = noimg}
                            alt={item.title} />
                        )}
                        <h2 className={style.mediaHeading} dangerouslySetInnerHTML={{__html : item.title}} />
                        <p className={style.desc} dangerouslySetInnerHTML={{__html : item.contents}} />
                        {item.price && (
                            <p className={style.price}>
                                정가:<span>{item.price}</span>
                                판매가:<span>{item.sale_price}</span>
                            </p>
                        )}
                        <p className={style.date}>
                            {item.authors && (
                                <span><strong>{item.authors.join(",")}</strong> / </span>
                            )}
                            {item.publisher && (
                                <span><strong>{item.publisher}</strong> / </span>
                            )}
                            {item.cafename && (
                                <span><strong>{item.cafename}</strong> / </span>
                            )}
                            {item.blogname && (
                                <span><strong>{item.blogname}</strong> / </span>
                            )}
                            {item.datetime && (
                               <span>{dayjs(item.datetime).format('YYYY-MM-DD hh:mm')}</span>
                            )}
                        </p>
                    </a>
                </li>
            ))}
        </ul>
    );
};
Listview.defaultProps = {
    documents : [],
    thumb : false
}

export default Listview;