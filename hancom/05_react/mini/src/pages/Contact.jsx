import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>📬 Contact</h1>
            <br></br>
            <br></br>
            <p className="contact-subtitle"></p>

            <div className="contact-links">
                <a
                    href="https://github.com/rainbow0291"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link github"
                >
                    <span className="icon">🔗</span>
                    <span className="text">GitHub</span>
                    <span className="url">github.com/rainbow0291</span>
                </a>

                <a
                    href="https://blog.naver.com/am027372"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link blog"
                >
                    <span className="icon">📝</span>
                    <span className="text">Blog</span>
                    <span className="url">blog.naver.com/am027372</span>
                </a>
            </div>
        </div>
    )
}

export default Contact