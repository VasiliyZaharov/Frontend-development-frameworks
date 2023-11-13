import React from "react";
import {myDocument} from "../../../reducers/searchReducer";
import ResultCard from "./ResultCard";
import {useState, useEffect} from "react";

interface ResultCardListProps {
    data: myDocument[] | null;


}


const ResultCardList: React.FC<ResultCardListProps> = ({ data }) => {
    const [visibleData, setVisibleData] = useState<myDocument[]>([]);
    const [next, setNext] = useState(2);

    const handleLoadMore = () => {
        setNext((prevNext) => prevNext + 2);
    };

    useEffect(() => {
        if(data && data.length > 0) {
            setVisibleData(data.slice(0, next));
        }
    }, [data, next]);
    return(
         <div className="result-card-list-wrapper">
              {visibleData.map((card, index) => (
                    <ResultCard
                        key={index}
                        title={card.ok.title.text}
                        content={card.ok.content.markup}
                        date={card.ok.issueDate}
                        url={card.ok.url}
                        source={card.ok.source.name}
                        tag={card.ok.attributes}
                        wordCount={card.ok.attributes.wordCount}
                    />
                ))}
                {next < (data?.length ?? 0) && (
                    <div className="lazy_loading-btn">
                         <button onClick={handleLoadMore} className="load-more-btn">
                            Load More
                        </button>
                    </div>

                )}
        </div>
    )
}
export default  ResultCardList;