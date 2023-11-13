import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/ResultPage.scss';
import StatisticComponent from "./StatisticComponent";
import {RootReducerType} from "../../store";
import ResultCardList from "./ResultCard/ResultCardList";



const ResultPage: React.FC = () => {
    const location = useLocation();
    const responseData = location.state?.responseData;
    const documents = useSelector((state: RootReducerType) => state.searchData.documents);


    console.log('Passed data to resultPage: ', responseData);
    console.log('Passed documents to resultPage: ', documents);

    return(
            <div className="result-content">
                <div className="result-static">
                    <div className="result-static_left">
                        <h1 className="result-static_main-title">We are searching. Results coming soon</h1>
                        <span className="result-static_span">The search may take some time, please be patient.</span>
                    </div>
                    <div className="result-static_pic">
                        <div className="result-pic">
                            <img src="/girl-pic.png" />
                        </div>
                    </div>
                </div>
                <div className="statistics_copm">
                    <StatisticComponent data={responseData} />
                    <div className="result_card_positions">
                        <div id="documents" className="result-static_main-title">List of documents</div>
                        <div className="res-card">
                            <ResultCardList data={documents}/>
                        </div>
                    </div>

                </div>
            </div>

    )
}

export default ResultPage;