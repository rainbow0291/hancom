// 💬 메시지 추가 함수
function addMessage(text, isUser = false) {
  const chatContainer = document.getElementById('chatContainer')
  const messageDiv = document.createElement('div')
  messageDiv.className = `message ${isUser ? 'user' : 'ai'}`

  const contentDiv = document.createElement('div')
  contentDiv.className = 'content'
  contentDiv.textContent = text

  messageDiv.appendChild(contentDiv)
  chatContainer.appendChild(messageDiv)

  // 자동 스크롤 (약간의 딜레이를 주어 DOM 렌더링 후 스크롤)
  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight
  }, 0)

  return contentDiv
}

// 📝 스트리밍 메시지 추가 함수
function addStreamingMessage() {
  const chatContainer = document.getElementById('chatContainer')
  const messageDiv = document.createElement('div')
  messageDiv.className = 'message ai'

  const contentDiv = document.createElement('div')
  contentDiv.className = 'content'
  contentDiv.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>'

  messageDiv.appendChild(contentDiv)
  chatContainer.appendChild(messageDiv)

  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight
  }, 0)

  return contentDiv
}

// ✅ 기존 코드: '보내기' 버튼에 클릭 동작 연결
document.getElementById('btn').addEventListener('click', () => {
  // id="q" 입력칸에 적은 질문 꺼내기
  const prompt = document.getElementById('q').value

  if (!prompt.trim()) return

  // 환영 화면 숨기기
  const welcomeScreen = document.getElementById('welcomeScreen')
  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden')
  }

  // 사용자 메시지 말풍선으로 표시
  addMessage(prompt, true)
  document.getElementById('q').value = ''
  document.getElementById('q').focus()

  // 스트리밍 로딩 표시
  const streamDiv = addStreamingMessage()
  document.getElementById('btn').disabled = true

  // 내 서버(프록시) 창구로 요청 (키 없음)
  // fetch(...).then(...).then(...).catch(...) 처럼 점(.)으로 쭉 이어붙이는 걸 "메서드 체이닝"이라 함
  // "요청 보내고(fetch) → 성공하면(then) → 또 처리하고(then) → 실패하면(catch)" 순서로 연결됨
  fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // 입력칸 값을 문자열로 바꿔 보내기
    body: JSON.stringify({ prompt })
  })
    // 응답을 객체로 변환
    .then(res => res.json())
    // 받은 답(reply)을 말풍선으로 표시
    .then(data => {
      streamDiv.innerHTML = ''
      streamDiv.textContent = data.reply || data.error
      // 스크롤
      setTimeout(() => {
        document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight
      }, 0)
    })
    // 서버가 안 켜져 있으면 안내 메시지
    .catch(err => {
      streamDiv.innerHTML = ''
      streamDiv.textContent = '❌ 서버 안 켜짐? (server서 node index.js 먼저)'
    })
    // 요청 완료 후 버튼 활성화
    .finally(() => {
      document.getElementById('btn').disabled = false
      document.getElementById('q').focus()
    })
})

// ✅ 엔터 키 처리 (Shift+Enter는 줄바꿈)
document.getElementById('q').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    document.getElementById('btn').click()
  }
})

// ✅ 입력 필드 높이 자동 조정
document.getElementById('q').addEventListener('input', function() {
  this.style.height = 'auto'
  this.style.height = Math.min(this.scrollHeight, 100) + 'px'
})

// ✅ 새 대화 버튼
document.getElementById('newChat').addEventListener('click', () => {
  const chatContainer = document.getElementById('chatContainer')
  chatContainer.innerHTML = `
    <div class="welcome-screen" id="welcomeScreen">
      <div class="welcome-content">
        <div class="welcome-logo">
          <div class="logo-large">
            <div class="logo-circle-large">
              <div class="logo-dot-large"></div>
            </div>
          </div>
        </div>
        <h2>Claude AI Chat</h2>
        <p>무엇을 도와드릴까요?</p>
        <div class="welcome-suggestions">
          <div class="suggestion-item">💡 질문하기</div>
          <div class="suggestion-item">📝 텍스트 작성</div>
          <div class="suggestion-item">🔍 분석하기</div>
        </div>
      </div>
    </div>
  `
  document.getElementById('q').value = ''
  document.getElementById('q').focus()
})

// ✅ 페이지 로드 시 입력칸 포커스
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('q').focus()
})
