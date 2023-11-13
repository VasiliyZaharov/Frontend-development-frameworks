import React from 'react';
import '../../styles/ResultPage.scss';
import DataSlider from "./DataSlider";
import DataSlider2 from "./DataSlider/DataSlider2";

interface DataItem {
    histogramType: string;
    data: Array<{ date: string; value: number }>;
}


interface StatisticComponentProps {
    data?: {
        data?: DataItem[];
    };
}

const StatisticComponent: React.FC<StatisticComponentProps> = ({ data }) => {

     if (!data || !data.data || data.data.length === 0) {
        return (
          <div className="stat-component">
            <div className="result-static_main-title">Summary</div>
            <div className="result-static_span">No data available</div>
          </div>);
    }
    //TODO delete old DataSlider and css for it
    return (
        <div className="stat-component">
            <div className="result-static_main-title">Summary</div>
            <div className="result-static_span"> {data.data[0].data.length} options found</div>
            <div className="data_slider">
                {/*{data && data.data && <DataSlider data={{ data: data.data }} />}*/}
                {data && data.data && <DataSlider2 items={data.data} />}
            </div>

        </div>
    )
}

export default StatisticComponent;