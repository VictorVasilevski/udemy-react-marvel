import {lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicsPage = lazy(() => import('../pages/SingleComicsPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            {/* Characters */}
                            <Route path="/" element={<MainPage/>}></Route>
                            {/* Comics */}
                            <Route path="/comics" element={<ComicsPage/>}></Route>
                            <Route path="/comics/:comicsId" element={<SingleComicsPage/>}></Route>
                            <Route path="*" element={<Page404/>}></Route>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;