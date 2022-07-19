import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getCafeList = createAsyncThunk("GET_CAFE_LIST", async(payload, {rejectWithValue})=>{
    let result = null;
if(payload.query){
    try {
        const apiUrl = "https://dapi.kakao.com/v2/search/cafe";
        result = await axios.get(apiUrl, {
            params : {
               
                    query : payload.query, page : payload.page, size : 20
                
            },
            headers : {
                Authorization : "KakaoAK fc4ae9f65a8ff5a3a85b0ed5a6cf19cd"
            }
        });
    }catch(err){
        result = rejectWithValue(err.response);
    }
}
    return result;
});

const CafeSlice = createSlice({
    name : 'cafe',
    initialState : {
        rt : null,
        rtmsg : null,
        item : [],
        loading : false
    },

    reducers : {},

    extraReducers : {
        [getCafeList.pending] : (state, {payload})=>{
            return {
                ...state,
                loading : true
            }
        },
        [getCafeList.fulfilled] : (state, {meta, payload})=>{
            if(meta.arg.page > 1) {
                payload.data.documents = state.item.documents.concat(payload.data.documents)
            }
            return {
                ...state,
                rt : payload.status,
                rtmsg : payload.statusText,
                item : payload.data,
                loading : false
            }
        },
        [getCafeList.rejected] : (state, {payload})=>{
            return {
                ...state,
                rt : payload.status,
                rtmsg : payload.statusText,
                item : payload.data,
                loading : false
            }
        }
    }
});

export default CafeSlice.reducer;