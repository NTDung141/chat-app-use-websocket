import "./HomePage.css"
import homePageBg from "../../image/chat-app-home.jpg"

function HomePage() {
    return (
        <div
            className="homePage"
            style={{ backgroundImage: `url(${homePageBg})` }}
        >
            <div className="home-modal">
                <div className="home-modal__title-1">CHAT APP</div>
                <div className="home-modal__title-2">We Will Never Be Alone</div>
            </div>
        </div>
    )
}

export default HomePage