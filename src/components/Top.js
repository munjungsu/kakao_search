import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';


const MenuLink = styled(NavLink)`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom: 2px;
    color: #222;

    &:hover {
        color: #22b8cf;
    }

    &:after {
        content: '|';
        display: inline-block;
        padding: 0 7px;
        color: #ccc;
    }

    &:last-child {
        &:after {
            color: #fff;
        }
    }

    &.active {
        text-decoration: underline;
        color: #22b8cf;
        &:after {
            border-bottom: 4px solid #fff !important;
        }
    }
`;
const Top = () => {
    
    const inputQuery = React.useRef();

    
    const [query, setQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();

        const value = inputQuery.current.value;

        if(!value){
            inputQuery.current.focus();
            alert('검색어를 입력하세요');
            return;
        }
        setQuery(value);
        navigate(`/web?query=${encodeURIComponent(value)}`);
    }
    return (
        <div>
            <h1>카카오 검색</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="search" name="query" ref={inputQuery}/>
                <button type="submit">검색</button>
            </form>
            <hr/>
            { query && (
            <nav>
                <MenuLink to={`/web?query=${encodeURIComponent(query)}`}>웹</MenuLink>
                <MenuLink to={`/blog?query=${encodeURIComponent(query)}`}>블로그</MenuLink>
                <MenuLink to={`/cafe?query=${encodeURIComponent(query)}`}>카페</MenuLink>
                <MenuLink to={`/book?query=${encodeURIComponent(query)}`}>책</MenuLink>
                <MenuLink to={`/image?query=${encodeURIComponent(query)}`}>이미지</MenuLink>
            </nav>
            )}
        </div>
    );
};

export default Top;