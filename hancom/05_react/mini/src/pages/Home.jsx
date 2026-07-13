import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>📚 교보문고 베스트셀러 TOP 15</h1>
                    <p>인문/과학 분야에서 가장 인기 있는 책들을 만나보세요</p>
                    <p className="hero-description">
                        인기 도서 정보를 확인하고,
                        미니 게임으로 책에 대해 배워보세요!
                    </p>
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">📖</div>
                    <br></br>
                    <h3>도서 카탈로그</h3>
                    <p>베스트셀러 TOP 15 도서를 한눈에 볼 수 있습니다</p>
                    <ul>
                        <li>✓ 북커버 디자인</li>
                        <li>✓ 상세 도서 정보</li>
                        <li>✓ 실시간 평점</li>
                    </ul>
                    <Link to="/catalog" className="feature-btn">
                        카탈로그 보기 →
                    </Link>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🎮</div>
                    <br></br>
                    <h3>책 제목 맞추기 Quiz</h3>
                    <p>책의 설명을 읽고 제목을 맞추는 재미있는 게임!</p>
                    <ul>
                        <li>✓ 10개 문제</li>
                        <li>✓ 타이머 시스템</li>
                        <li>✓ 점수 및 평가</li>
                    </ul>
                    <Link to="/game" className="feature-btn">
                        게임 시작 →
                    </Link>
                </div>
            </div>

            <div className="info-section">
                <h2>✨ 특징</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-icon">🎨</span>
                        <br></br>
                        <h4>디자인</h4>
                        <p>각 도서별 고유한 색상과 3D 효과</p>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">⚡</span>
                        <br></br>
                        <h4>부드러운 
                            <br></br>
                            애니메이션</h4>
                        <p>호버, float 등 
                            <br></br>
                            다양한 효과</p>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">📱</span>
                        <br></br>
                        <h4>반응형 디자인</h4>
                        <p>모바일부터 데스크톱까지 모두 지원</p>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">⭐</span>
                        <br></br>
                        <h4>상세 도서 정보</h4>
                        <p>베스트셀러 정보 제공</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home