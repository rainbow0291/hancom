import './Content.css'

const Content = () => {
    return (
        <>
            <main>
                <section className="hero">
                    <h1>안녕하세요! 👋</h1>
                    <p>저는 웹 개발자입니다</p>
                </section>

                <section className="intro">
                    <h2>소개</h2>
                    <p>
                        React와 JavaScript를 활용한 프론트엔드 개발에 열정이 있습니다.
                        <br />
                        사용자 경험을 중심으로 하는 깔끔하고 효율적인 코드를 작성하려고 노력합니다.
                        <br />
                        새로운 기술을 배우고 성장하는 것을 즐깁니다.
                    </p>
                </section>

                <section className="skills">
                    <h2>주요 기술스택</h2>
                    <div className="skill-list">
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">CSS</span>
                        <span className="skill-tag">HTML</span>
                    </div>
                </section>

                <section className="projects">
                    <h2>최근 작업</h2>
                    <p>다양한 프로젝트들을 진행해왔습니다. 아래 버튼을 눌러 더 자세히 확인해보세요!</p>
                    <button className="portfolio-btn"><a href="#work">포트폴리오 보기 →</a></button>
                </section>

                <section className="cta">
                    <h2>함께 일하고 싶으신가요?</h2>
                    <p>프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든지 연락주세요!</p>
                    <button className="contact-btn"><a href="#contact">연락처로 문의하기 →</a></button>
                </section>
            </main>
        </>
    )
}

export default Content
