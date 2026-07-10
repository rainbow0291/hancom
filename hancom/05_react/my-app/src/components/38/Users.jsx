import { useState, useEffect } from "react"; 

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('데이터 로딩 실패:', error))
    }, [])
    
    return (
        <>
        <ul>
      {/* map: 배열 돌며 항목마다 li 생성 / key: 고유값(필수) */}
        {users.map((u) => (
        <li key={u.id}>
            <strong>{u.name}</strong> ({u.company.name})
        </li>
      ))}
        </ul>
        </>
    )
}

export default Users

