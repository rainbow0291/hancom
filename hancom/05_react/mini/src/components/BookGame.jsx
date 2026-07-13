import { useState, useEffect } from 'react';
import './BookGame.css';

const BookGame = () => {
  const questions = [
    {
      id: 1,
      description: '자아 수행과 해탈을 찾아가는 청년의 영적 여정. 삶의 참된 의미를 찾는 감동적인 성장 소설입니다.',
      options: ['싯다르타', '데미안', '호밀밭의 파수꾼', '노르웨이의 숲'],
      correct: 0,
      emoji: '🧘',
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      description: '청춘의 고뇌와 자아 찾기의 여정을 그린 자전적 성장소설입니다.',
      options: ['1984', '데미안', '사피엔스', '호밀밭의 파수꾼'],
      correct: 1,
      emoji: '🎭',
    },
    {
      id: 3,
      description: '전체주의 체제를 풍자한 디스토피아 소설의 거작입니다.',
      options: ['노르웨이의 숲', '1984', '동물농장', '이방인'],
      correct: 1,
      emoji: '🚫',
    },
    {
      id: 4,
      description: '동물들을 통해 권력과 독재, 사회 부조리를 풍자적으로 비판합니다.',
      options: ['수레바퀴 아래서', '동물농장', '위대한 개츠비', '코스모스'],
      correct: 1,
      emoji: '🐷',
    },
    {
      id: 5,
      description: '사랑과 결혼, 사회적 신분을 다룬 영국 고전문학의 걸작입니다.',
      options: ['호밀밭의 파수꾼', '오만과 편견', '체호프 단편선', '이기적 유전자'],
      correct: 1,
      emoji: '👰',
    },
    {
      id: 6,
      description: '우주의 신비로움을 과학적으로 탐구하는 교양과학서의 최고봉입니다.',
      options: ['코스모스', '슈퍼컨버전스', '이기적 유전자', '위대한 개츠비'],
      correct: 0,
      emoji: '🌌',
    },
    {
      id: 7,
      description: '진화론을 새로운 관점에서 설명하는 현대 과학의 걸작입니다.',
      options: ['코스모스', '이기적 유전자', '노르웨이의 숲', '오만과 편견'],
      correct: 1,
      emoji: '🧬',
    },
    {
      id: 8,
      description: '1920년대 뉴욕의 호화로움과 그 뒤의 비극을 그린 미국 고전문학의 거작입니다.',
      options: ['위대한 개츠비', '이방인', '호밀밭의 파수꾼', '1984'],
      correct: 0,
      emoji: '✨',
    },
    {
      id: 9,
      description: '교육 제도의 억압과 개성의 탄압을 다룬 자전적 성장소설입니다.',
      options: ['급류', '수레바퀴 아래서', '싯다르타', '데미안'],
      correct: 1,
      emoji: '📚',
    },
    {
      id: 10,
      description: '1960년대 도쿄를 배경으로 청춘의 고독과 사랑, 죽음의 의미를 성찰합니다.',
      options: ['이방인', '노르웨이의 숲', '급류', '호밀밭의 파수꾼'],
      correct: 1,
      emoji: '❤️',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (answered || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, gameOver]);

  const handleAnswer = (index) => {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 10);
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(15);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setGameOver(false);
    setTimeLeft(15);
    setCorrectCount(0);
  };

  const ConfettiPiece = ({ delay, duration, left, color }) => (
    <div
      className="confetti"
      style={{
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--left': `${left}%`,
        '--color': color,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );

  if (gameOver) {
    const percentage = Math.floor((correctCount / questions.length) * 100);
    let message;
    let medal;

    if (percentage === 100) {
      message = '완벽해요! 모든 책을 알고 계시네요! 진정한 독서가입니다! 📚✨';
      medal = '🏆';
    } else if (percentage >= 80) {
      message = '훌륭해요! 많은 책들을 알고 계십니다! 🌟';
      medal = '🥇';
    } else if (percentage >= 60) {
      message = '좋아요! 계속 도서를 읽으시면 더 좋아질 거예요! 📖';
      medal = '🥈';
    } else if (percentage >= 40) {
      message = '괜찮아요! 새로운 책들을 추천해 드립니다! 📚';
      medal = '🥉';
    } else {
      message = '더 많은 책을 읽어보세요! 지식의 세계가 펼쳐질 거예요! 💪';
      medal = '📖';
    }

    return (
      <div className="game-container">
        <div className="game-over-screen">
          <div className="medal">{medal}</div>
          <div className="score-display">
            <h1>🎉 게임 완료!</h1>
            <div className="final-score">{score}점</div>
            <div className="score-stats">
              <p className="correct-count">{correctCount}개/{questions.length}개 정답</p>
              <p className="percentage">{percentage}%</p>
            </div>
            <p className="score-message">{message}</p>
          </div>
          <button className="restart-btn" onClick={handleRestart}>
            🔄 다시 플레이
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const timeClass = timeLeft < 5 ? 'danger' : timeLeft < 10 ? 'warning' : '';

  const confettiPieces = selected === question.correct
    ? Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece
          key={i}
          delay={Math.random() * 0.5}
          duration={2 + Math.random() * 1}
          left={Math.random() * 100}
          color={['#ff1493', '#00d4ff', '#7fff00', '#ff6b6b', '#1e90ff', '#ffd700', '#00ff7f', '#ff69b4'][Math.floor(Math.random() * 8)]}
        />
      ))
    : [];

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>📖 베스트셀러 책 제목 맞추기!</h1>
        <div className="game-stats">
          <div className="score">점수: <span>{score}점</span></div>
          <div className="correct">정답: <span>{correctCount}/{questions.length}</span></div>
          <div className={`timer ${timeClass}`}>
            <span>⏱️ {timeLeft}초</span>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        문제 {currentQuestion + 1} / {questions.length}
      </p>

      <div className="question-card">
        <div className="emoji-large">{question.emoji}</div>
        <h2>📝 이 책의 설명을 읽고 제목을 맞춰보세요!</h2>
        <div className="description-box">
          <p>"{question.description}"</p>
        </div>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selected === index
                  ? index === question.correct
                    ? 'correct'
                    : 'incorrect'
                  : answered && index === question.correct
                  ? 'correct'
                  : ''
              } ${answered ? 'disabled' : ''}`}
              onClick={() => handleAnswer(index)}
              disabled={answered}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
              {selected === index && (
                <span className="result">
                  {index === question.correct ? '✓ 정답!' : '✗ 틀렸어요!'}
                </span>
              )}
              {answered && index === question.correct && selected !== index && (
                <span className="result correct-answer">✓ 정답</span>
              )}
            </button>
          ))}
        </div>

        {answered && (
          <div className="answer-section">
            {selected === question.correct && (
              <div className="confetti-container">
                {confettiPieces}
              </div>
            )}
            <p className="feedback">
              {selected === question.correct
                ? '🎉 훌륭한 선택입니다!'
                : '아쉬워요! 다음 기회에 더 잘할 수 있어요!'}
            </p>
            <button className="next-btn" onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? '게임 끝내기' : '다음 문제'} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookGame;
