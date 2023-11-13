import React from "react";
import './styles/App.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import AuthPage from "./components/AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./components/Search/SearchPage";
import ResultPage from "./components/Result/ResultPage";


function App(){

    return (
        <div className="app">

            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/resultpage" element={<ResultPage />} />
                </Routes>

            </main>
            <footer>
                <Footer/>
            </footer>

        </div>
      );
    }

export default App;
