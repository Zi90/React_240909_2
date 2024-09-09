import React from 'react';
import { useState } from 'react';
// import { useEffect } from 'react';
import axios from 'axios';

const User = () => {
    
    const [ users, setUsers ] = useState([]);
    // 다운로드가 잘 되었는지 확인용 / 에러 확인용
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchUsers = async () => {   
            try{
                // 요청이 시작되면 loading의 상태를 true로 변경
                setLoading(true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                console.log(response);
                setUsers(response.data);  // data는 response.data 안에 담겨있음.
            }catch(e){
                setError(e);
            }
            setLoading(false);
    }

    // useEffect(() => {
    //     fetchUsers();
    // },[]);

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>
    // if(!users) return <div>User null!!!</div>

    return (
        <div className='user'>
            <div>User.jsx 영역</div>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>{user.username} ({user.name})</li>
                    ))
                }
            </ul>
            {/* button을 추가하여 클릭시 user 데이터가 뜰 수 있도록 설정 */}
            <button onClick={fetchUsers}>데이터 불러오기</button>
        </div>
    );
};

export default User;