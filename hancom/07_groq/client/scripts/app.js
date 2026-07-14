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

//  기존 코드: '보내기' 버튼에 클릭 동작 연결
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
      // 정상 답변을 받으면 작은 축하 컨페티
      if (data.reply) launchConfetti(50)
    })
    // 서버가 안 켜져 있으면 안내 메시지
    .catch(err => {
      streamDiv.innerHTML = ''
      streamDiv.textContent = '❌ 서버 안 켜짐? (server서 node index.js 먼저)'
      streamDiv.classList.add('error')
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
        <h2>AI Chat</h2>
        <p>무엇을 도와드릴까요?</p>
      </div>
    </div>
  `
  document.getElementById('q').value = ''
  document.getElementById('q').focus()
  launchConfetti(80)
})

// 🎉 컨페티 효과 (바닐라 JS, 외부 라이브러리 없음)
// 캔버스에 핑크/아이보리 색종이 조각을 뿌리고, 중력/회전을 주며 서서히 사라지게 함
const confettiCanvas = document.getElementById('confettiCanvas')
const confettiCtx = confettiCanvas.getContext('2d')
let confettiParticles = []
let confettiAnimationId = null

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth
  confettiCanvas.height = window.innerHeight
}
window.addEventListener('resize', resizeConfettiCanvas)
resizeConfettiCanvas()

const CONFETTI_COLORS = ['#ff8fa3', '#ffb6d9', '#ffd1e3', '#ff6b9d', '#fffbf8', '#ffe4ee']

function createConfettiParticle() {
  return {
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height * 0.3,
    size: 6 + Math.random() * 6,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    opacity: 1,
    shape: Math.random() > 0.5 ? 'circle' : 'square'
  }
}

function launchConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    confettiParticles.push(createConfettiParticle())
  }
  if (!confettiAnimationId) {
    confettiAnimationId = requestAnimationFrame(animateConfetti)
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)

  confettiParticles.forEach(p => {
    p.y += p.speedY
    p.x += p.speedX
    p.rotation += p.rotationSpeed
    // 화면 하단 70% 지점부터 서서히 투명해지며 사라짐
    if (p.y > confettiCanvas.height * 0.7) {
      p.opacity -= 0.02
    }

    confettiCtx.save()
    confettiCtx.globalAlpha = Math.max(p.opacity, 0)
    confettiCtx.translate(p.x, p.y)
    confettiCtx.rotate((p.rotation * Math.PI) / 180)
    confettiCtx.fillStyle = p.color
    if (p.shape === 'circle') {
      confettiCtx.beginPath()
      confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
      confettiCtx.fill()
    } else {
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
    }
    confettiCtx.restore()
  })

  // 화면 밖으로 나갔거나 완전히 투명해진 조각은 제거
  confettiParticles = confettiParticles.filter(
    p => p.y < confettiCanvas.height + 40 && p.opacity > 0
  )

  if (confettiParticles.length > 0) {
    confettiAnimationId = requestAnimationFrame(animateConfetti)
  } else {
    confettiAnimationId = null
  }
}

//  페이지 로드 시 입력칸 포커스 + 환영 컨페티
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('q').focus()
  launchConfetti(140)
})

//  모바일 사이드바 열기/닫기 (오프캔버스 드로어)
const sidebarPanel = document.getElementById('sidebarPanel')
const sidebarToggle = document.getElementById('sidebarToggle')
const sidebarBackdrop = document.getElementById('sidebarBackdrop')

function openSidebar() {
  sidebarPanel.classList.add('open')
  sidebarBackdrop.classList.add('open')
  sidebarToggle.setAttribute('aria-expanded', 'true')
}

function closeSidebar() {
  sidebarPanel.classList.remove('open')
  sidebarBackdrop.classList.remove('open')
  sidebarToggle.setAttribute('aria-expanded', 'false')
}

sidebarToggle.addEventListener('click', () => {
  sidebarPanel.classList.contains('open') ? closeSidebar() : openSidebar()
})

sidebarBackdrop.addEventListener('click', closeSidebar)

// 모바일에서 새 대화를 시작하면 드로어를 자동으로 닫음
document.getElementById('newChat').addEventListener('click', closeSidebar)

