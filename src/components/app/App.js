import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";


const App = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id === selectedChar ? null : id)
    }

    return (
        <div className="app">
            <AppHeader/>
            {/* Characters */}
            {/* <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> */}

            {/* Comics */}
            <main>
                <AppBanner/>
                <ErrorBoundary>
                    <ComicsList/>
                </ErrorBoundary>
            </main>
        </div>
    )
    
}

export default App;