const express = require("express")  // 1. 꺼내기
const app = express()  // 2. 만들기
app.use(express.json())

const ids = [1,3,5,6,10,11]

fetch('http://192.168.10.28:5000/hancom/정유진/users', {
  headers: { 'Authorization': 'HANCOM' }
})
  .then(res => res.json())
  .then(students => {
    console.log(students)  
    
  })

// 삭제할 데이터 목록 
let users = [
    {id: 1, name:"이순신"},
    {id: 3, name:"김영희"},
    {id: 5, name:"홍길동"},
    {id: 6, name:"최민준"},
    {id: 10, name:"조수진"},
    {id: 11, name:"박순호"}
]

// 3. 규칙 만들기 
app.delete('/hancom/정유진/users', (req, res) => {
    users = users.filter(u=>u.id !== Number(req.params.id))
    res.json({ok: true, 남은: users})
})  


// 4. 문열기

app.listen(5000, async () => {
 
   for (const id of ids) {
    try {
      const res = await fetch(
        `http://192.168.10.28:5000/hancom/정유진/users/${id}`,
        {
          method: "DELETE",
          headers: { 'Authorization': 'HANCOM' }
        }
      )
      console.log(` ID ${id} 삭제 (상태: ${res.status})`)
    } catch (error) {
      console.error(` ID ${id} 삭제 실패:`, error.message)
    }
  }
})

idsToDelete = [1,3,5,6,10,11]

// HTML 그리드 생성 (4행 5열)
function generateGridHTML(result, idsToDelete) {
  const users = result.남은 || []

  
  // 4행 5열로 배열
  const rows = 4
  const cols = 5

  users.forEach((user, index) => {
    // 각 행의 첫 번째 카드일 때 행 번호 표시
    if (index % cols === 0) {
      const rowNum = Math.floor(index / cols) + 1
      html += `<div class="row-number">▼ ${rowNum}행</div>`
    }

    
  })
  return html
}

// 라우트
app.get('/', (req, res) => {
  res.send(req.app.locals.gridHTML || '<h1>데이터 로딩 중...</h1>')
})

// 서버 시작
app.listen(5000, async () => {
//  try {
    console.log('\n 서버 시작...\n')

    // DELETE 요청
    
    console.log('  사용자 삭제 중...')
    const res = await fetch(
      "http://192.168.10.28:5000/hancom/정유진/users",
      {
        method: "DELETE",
        headers: {
          'Authorization': 'HANCOM',
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ ids: idsToDelete })
      }
    )
    
    const result = await res.json()
    const remainingUsers = result.남은 || []

    // HTML 생성
    const gridHTML = generateGridHTML(result, idsToDelete)
    app.locals.gridHTML = gridHTML

    // 파일로 저장
    const fs = require('fs')
    fs.writeFileSync('./result.html', gridHTML)

    // 콘솔 결과 출력
    console.log('\n' + '═'.repeat(60))
    console.log(' 삭제 완료!')
    console.log('═'.repeat(60))
    console.log('\n 남은 사용자 목록:')
    remainingUsers.forEach((user, i) => {
      const row = Math.floor(i / 5) + 1
      const col = (i % 5) + 1
      console.log(`   [${row}행 ${col}열] ID: ${user.id.toString().padStart(2)} - ${user.name}`)
})
    console.log('\n' + '═'.repeat(60))
    console.log(' 파일 저장: ./result.html')
    console.log(' 웹 접속: http://192.168.10.28:5000/hancom/정유진/users')
    console.log('═'.repeat(60) + '\n')

    }) 
