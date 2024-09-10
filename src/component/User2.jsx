import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import axios from 'axios';

// useReducer로 요청 상태 관리하기
// action type : SUCCESS / ERROR / LOADING
function reducer( state, action ){
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };            
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type : ${action.type}`)
    }
}

const User2 = () => {

    const [ state, dispatch ] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    // const [ users, setUsers ] = useState([]);

    const fetchUsers = async () => {   
        try{
            dispatch( { type : 'LOADING' } );
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            console.log(response);
            // setUsers(response.data);
            dispatch( { type : 'SUCCESS', data:response.data});
        }catch(e){
            dispatch( { type : 'ERROR', error: e } );
        }
    }

    useEffect(() => {
        fetchUsers();
    },[]);

    const { loading, data:users, error } = state;  // state.date => users 키워드로 조회

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return <div>User null!!!</div>

    return (
        <div className='user2'>
            <div>User2.jsx 영역</div>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>{user.username} ({user.name})</li>
                    ))
                }
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default User2;