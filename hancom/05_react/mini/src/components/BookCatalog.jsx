import { useState } from 'react';
import './BookCatalog.css';

const BookCatalog = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log('Bookmarks load error:', error);
      return [];
    }
  });

  const books = [
    {
      id: 1,
      title: '싯다르타',
      author: '헤르만 헤세',
      publisher: '민음사',
      year: 1922,
      description: '인도에서 영적 깨달음을 추구하는 청년 싯다르타의 여정을 그린 성장소설. 부와 쾌락, 고행과 명상을 거쳐 인생의 참된 의미와 영혼의 평화를 찾아가는 과정을 섬세하게 담아낸 세계문학 최고의 걸작입니다.',
      pages: 280,
      price: 8000,
      rating: 9.8,
      review: '인생의 방향을 찾는 모든 이들이 읽어야 할 필독서',
      imageUrl: '/1.싯다르타.jpg',
    },
    {
      id: 2,
      title: '데미안',
      author: '헤르만 헤세',
      publisher: '민음사',
      year: 1919,
      description: '청춘의 고뇌와 자아 찾기의 여정을 그린 자전적 성장소설. 세상의 위선과 억압에 맞서면서 자신의 진정한 정체성을 발견해 나가는 한 소년의 정신적 성숙 과정을 통해 인간 존재의 의미를 탐구합니다.',
      pages: 224,
      price: 8000,
      rating: 9.7,
      review: '세대를 뛰어넘어 청춘들의 영원한 지침서',
      imageUrl: '/2.데미안.jpg',
    },
    {
      id: 3,
      title: '체호프 단편선',
      author: '안톤 체호프',
      publisher: '민음사',
      year: 2002,
      description: '러시아 문학의 거장 체호프의 대표 단편 모음집. 인간의 내면세계와 일상 속의 드라마를 섬세하고 따뜻하게 포착한 작품들로, 인간관계의 미묘함과 삶의 진실을 보여주는 명작들입니다.',
      pages: 450,
      price: 9000,
      rating: 9.8,
      review: '일상의 순간들 속에 담긴 인생의 진실을 깨닫게 하는 작품들',
      imageUrl: '/3.체호프.jpg',
    },
    {
      id: 4,
      title: '급류',
      author: '정대건',
      publisher: '민음사',
      year: 2022,
      description: '첫사랑과 가족의 균열, 죄책감과 회복을 다루는 현대 장편소설. 인연과 만남, 사랑의 의미를 깊이 있게 탐구하며, 세상의 급류 속에서 헤아려 나가는 인물들의 삶을 감동적으로 그려냅니다.',
      pages: 340,
      price: 14000,
      rating: 9.3,
      review: '현대인의 심리와 감정을 깊이 있게 드러낸 수작',
      imageUrl: '/4.급류.jpg',
    },
    {
      id: 5,
      title: '이방인',
      author: '알베르 카뮈',
      publisher: '민음사',
      year: 1942,
      description: '실존주의 문학의 대표작으로, 부조리한 세상 속에서 고독하게 살아가는 인간의 본질을 탐구합니다. 사회의 관습과 규범에 맞서며 자신의 존재 의미를 찾아가는 주인공의 이야기는 현대 사회에 대한 깊은 성찰을 제시합니다.',
      pages: 280,
      price: 10000,
      rating: 9.8,
      review: '현대사회의 소외감을 가장 잘 표현한 철학소설',
      imageUrl: '/5.이방인.jpg',
    },
    {
      id: 6,
      title: '노르웨이의 숲',
      author: '무라카미 하루키',
      publisher: '민음사',
      year: 1987,
      description: '1960년대 도쿄를 배경으로 청춘의 고독과 사랑, 죽음의 의미를 성찰하는 현대 문학의 걸작. 잃어버린 첫사랑의 추억 속에서 성장해가는 청년의 심리를 세밀하게 그려내며, 인생의 아픔과 아름다움을 동시에 보여줍니다.',
      pages: 850,
      price: 17000,
      rating: 9.4,
      review: '일상 속 우울함과 사랑의 아름다움을 그려낸 명작',
      imageUrl: '/6.노르웨이의숲.jpg',
    },
    {
      id: 7,
      title: '1984',
      author: '조지 오웰',
      publisher: '민음사',
      year: 1949,
      description: '전체주의 체제를 풍자한 디스토피아 소설의 거작. 빅브라더의 감시 아래 있는 미래 사회에서 개인의 자유와 진실을 추구하는 한 남자의 저항과 좌절을 그려내며, 권력의 본질과 인간의 존엄성에 대한 근본적인 질문을 던집니다.',
      pages: 544,
      price: 11000,
      rating: 9.7,
      review: '미래의 위협을 가장 명확히 경고한 20세기 최고의 소설',
      imageUrl: '/7.1984.jpg',
    },
    {
      id: 8,
      title: '동물농장',
      author: '조지 오웰',
      publisher: '민음사',
      year: 1945,
      description: '동물들의 혁명을 통해 권력과 독재, 사회 부조리를 풍자적으로 비판하는 우화 소설. 짧지만 강력한 메시지를 담은 이 작품은 정치 권력의 부정과 부패를 날카롭게 지적하며 모든 혁명이 직면하는 비극을 보여줍니다.',
      pages: 232,
      price: 8000,
      rating: 9.8,
      review: '짧지만 강력한 메시지를 전달하는 정치 풍자의 정점',
      imageUrl: '/8.동물농장.jpg',
    },
    {
      id: 9,
      title: '오만과 편견',
      author: '제인 오스틴',
      publisher: '민음사',
      year: 1813,
      description: '사랑과 결혼, 사회적 신분을 다룬 영국 고전문학의 걸작. 오해와 편견으로 시작된 두 주인공의 관계가 서로를 이해하고 진정한 사랑을 찾아가는 과정을 통해 인간의 성장과 관계의 소중함을 그려냅니다.',
      pages: 456,
      price: 13000,
      rating: 9.6,
      review: '사랑과 성장을 그린 영원한 고전의 정수',
      imageUrl: '/9.오만과편견.jpg',
    },
    {
      id: 10,
      title: '호밀밭의 파수꾼',
      author: 'J.D. 샐린저',
      publisher: '민음사',
      year: 1951,
      description: '청춘의 방황과 심리를 다룬 미국 문학의 명작. 고등학교를 중퇴한 소년 홀든이 뉴욕 거리를 헤매며 펼치는 독백적 이야기를 통해 청년기의 정체성 혼란과 세상의 위선에 맞서는 진정성을 보여줍니다.',
      pages: 320,
      price: 12000,
      rating: 9.5,
      review: '세대를 뛰어넘어 공감받는 청춘의 목소리',
      imageUrl: '/10.호밀밭의파수꾼.jpg',
    },
    {
      id: 11,
      title: '위대한 개츠비',
      author: 'F. 스콧 피츠제럴드',
      publisher: '민음사',
      year: 1925,
      description: '1920년대 뉴욕의 호화로움과 그 뒤의 비극을 그린 미국 고전문학의 거작. 과거의 꿈을 놓지 못하는 개츠비의 이야기를 통해 아메리칸 드림의 본질과 인간의 욕망, 그리고 그것의 결말을 깊이 있게 탐구합니다.',
      pages: 280,
      price: 9000,
      rating: 9.5,
      review: '아메리칸 드림의 영원한 성찰',
      imageUrl: '/11.위대한개츠비.jpg',
    },
    {
      id: 12,
      title: '수레바퀴 아래서',
      author: '헤르만 헤세',
      publisher: '민음사',
      year: 1906,
      description: '교육 제도의 억압과 개성의 탄압을 다룬 자전적 성장소설. 영재 소년이 엄격한 교육 체계와 사회적 기대 속에서 자신의 예술적 열정과 개성을 잃어가는 비극적 과정을 섬세하게 그려내며 교육의 본질에 대한 깊은 질문을 던집니다.',
      pages: 256,
      price: 8000,
      rating: 9.5,
      review: '교육 체계의 부조리를 가장 잘 표현한 고전',
      imageUrl: '/12.수레바퀴아래서.jpg',
    },
    {
      id: 13,
      title: '코스모스',
      author: '칼 세이건',
      publisher: '사이언스북스',
      year: 1980,
      description: '우주의 신비로움을 과학적으로 탐구하는 교양과학서의 최고봉. 빅뱅부터 현재까지 우주의 역사와 인간의 위치를 마치 여행하듯 보여주며, 과학의 아름다움과 인간의 존재 의미에 대한 깊은 성찰을 제시합니다.',
      pages: 528,
      price: 22000,
      rating: 9.9,
      review: '과학의 아름다움을 가장 잘 전달한 명작',
      imageUrl: '/13. 코스모스.jpg',
    },
    {
      id: 14,
      title: '이기적 유전자',
      author: '리처드 도킨스',
      publisher: '을유문화사',
      year: 1976,
      description: '진화론을 새로운 관점에서 설명하는 현대 과학의 걸작. 유전자의 입장에서 본 생명의 진화를 탐구하며, 생물학과 철학의 경계에서 인간 존재와 생명의 의미에 대한 혁신적인 통찰을 제시합니다.',
      pages: 496,
      price: 20000,
      rating: 9.6,
      review: '생물학과 철학의 경계에서 빛나는 통찰',
      imageUrl: '/14.이기적유전자.jpg',
    },
    {
      id: 15,
      title: '슈퍼컨버전스',
      author: '제이미 메츨',
      publisher: '비즈니스북스',
      year: 2026,
      description: '유전공학, 바이오테크, AI 혁명이 열어갈 인류의 미래를 예측하는 현대 지식서. 기술 혁신이 가져올 삶의 변화와 인류의 미래 모습을 구체적으로 제시하며, 새로운 시대를 준비하기 위한 깊은 인사이트를 제공합니다.',
      pages: 400,
      price: 24000,
      rating: 9.4,
      review: '미래를 이해하기 위한 필수 교양서',
      imageUrl: '/15.슈퍼컨버전스.jpg',
    },
  ];

  const toggleBookmark = (bookId) => {
    try {
      const updated = bookmarks.includes(bookId)
        ? bookmarks.filter(id => id !== bookId)
        : [...bookmarks, bookId];
      setBookmarks(updated);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
    } catch (error) {
      console.log('Bookmark save error:', error);
    }
  };

  const authors = [...new Set(books.map(b => b.author))];

  const filteredBooks = books.filter(book => {
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAuthor = !filterAuthor || book.author === filterAuthor;
    return matchSearch && matchAuthor;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch(sortBy) {
      case 'id':
        return a.id - b.id;
      case 'title':
        return a.title.localeCompare(b.title, 'ko');
      case 'author':
        return a.author.localeCompare(b.author, 'ko');
      case 'rating':
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <div className="catalog-container">
      <h1>📚 고전문학 & 교양도서 15선</h1>
      <p className="subtitle">세계 명저와 현대 지식의 만남</p>

      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="📖 책 제목이나 저자로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-controls">
          <div className="filter-group">
            <label>저자 필터:</label>
            <select value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)} className="filter-select">
              <option value="">모든 저자</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>정렬:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="id">번호순 1-15</option>
              <option value="rating">평점순 ⭐</option>
              <option value="title">제목순</option>
              <option value="author">저자순</option>
            </select>
          </div>

          <div className="bookmark-status">
            ❤️ 찜한 책: {bookmarks.length}개
          </div>
        </div>
      </div>

      <div className="results-info">
        검색 결과: <strong>{sortedBooks.length}</strong>개의 책
      </div>

      <div className="books-grid">
        {sortedBooks.map(book => (
          <div
            key={book.id}
            className={`book-card-wrapper ${selectedBook?.id === book.id ? 'active' : ''}`}
            onClick={() => setSelectedBook(book)}
          >
            <div className="book-card">
              {bookmarks.includes(book.id) && <div className="bookmark-badge">❤️</div>}
              <div className="book-cover" style={{ background: `url(${book.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {book.imageUrl && (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="book-cover-image"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <div className="cover-pattern"></div>
                <div className="cover-rank">#{book.id}</div>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">저자: {book.author}</p>
                <div className="rating">
                  {'⭐'.repeat(Math.floor(book.rating))}
                  <span> {book.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="book-detail">
          <div className="detail-header">
            <h2>#{selectedBook.id} {selectedBook.title}</h2>
            <div className="detail-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(selectedBook.id);
                }}
                className={`bookmark-btn ${bookmarks.includes(selectedBook.id) ? 'active' : ''}`}
              >
                {bookmarks.includes(selectedBook.id) ? '❤️ 찜됨' : '🤍 찜하기'}
              </button>
              <button onClick={() => setSelectedBook(null)}>닫기 ✕</button>
            </div>
          </div>
          <div className="detail-content">
            <div className="detail-left">
              <div className="detail-book-cover" style={{ background: `url(${selectedBook.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {selectedBook.imageUrl && (
                  <img
                    src={selectedBook.imageUrl}
                    alt={selectedBook.title}
                    className="detail-book-image"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <div className="cover-pattern"></div>
              </div>
              <div className="detail-stats">
                <div className="stat" style={{ borderLeft: `4px solid #1e90ff` }}>
                  <span className="label">평점</span>
                  <span className="value">{selectedBook.rating}/10.0</span>
                </div>
                <div className="stat" style={{ borderLeft: `4px solid #1e90ff` }}>
                  <span className="label">페이지</span>
                  <span className="value">{selectedBook.pages}쪽</span>
                </div>
              </div>
            </div>
            <div className="detail-right">
              <p><strong>저자:</strong> {selectedBook.author}</p>
              <p><strong>출판사:</strong> {selectedBook.publisher}</p>
              <p><strong>출판년:</strong> {selectedBook.year}년</p>
              <div className="description">
                <h4>📝 책 소개</h4>
                <p>{selectedBook.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;
