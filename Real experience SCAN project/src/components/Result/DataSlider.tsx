import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/DataSlider.css';

export interface DataElement {
  histogramType: string;
  data: Array<{ date: string; value: number }>;
}

interface DataSliderProps {
  data: {
    data: DataElement[];
  };
}

const DataSlider: React.FC<DataSliderProps> = ({ data }) => {
  console.log("DataSlider", data);
  const [index, setIndex] = useState(0);
  const isLoading = useSelector((state: { loading: boolean }) => state.loading);
  const maxLength = 8;

  const dates = data.data[0].data
    .map(element => element.date.split("T")[0])
    .slice(index, index + maxLength);

  const documents = data.data
    .filter(obj => obj.histogramType === "totalDocuments")
    .map(obj => obj.data.map(obj => obj.value))[0]
    .slice(index, index + maxLength);

  const risks = data.data
    .filter(obj => obj.histogramType === "riskFactors")
    .map(obj => obj.data.map(obj => obj.value))[0]
    .slice(index, index + maxLength);

  function handleSteps(e: React.MouseEvent, step: number): void {
    const newIndex = index + step;
    if ((-1 < newIndex) && (newIndex < dates.length)) {
      setIndex(newIndex);
    }
    console.log(index);
  }

  if (isLoading) {
    return (
      <div className="data-slider_box">
        {/*<Circles type="Oval" color="#000000" height={50} width={50} />*/}
      </div>
    );
  }

  return (
      <div className="slider-container">
            <div className="slider-btn_left" onClick={e => handleSteps(e, -1)}>&lt;</div>
            <div className="data-slider_box">
                <div className="data-slider_left-part">
                    <div className="data-slider_titles">
                        <span className="titles">Period</span>
                        <span className="titles">Total</span>
                        <span className="titles">Risks</span>
                    </div>
                </div>
                <div className="data-slider_right-part">
                    <div className="table">
                        <div className="table-tr">
                          {dates.map((elem, i)  => {
                              return(
                                  <div className="table-value" key={i}>{elem}</div>
                              )
                          })}
                      </div>
                      <div className="table-tr">
                          {documents.map((doc, i) => {
                              return (
                                  <div className="table-value" key={i}>{doc}</div>
                              )
                          })}
                      </div>
                          <div className="table-tr">
                              {risks.map((risk, i) => {
                                  return (
                                      <div className="table-value" key={i}>{risk}</div>
                                  )
                              })}
                          </div>
                      <div className="separator_stat"></div>
                    </div>
                </div>
            </div>
            <div className="slider-btn_right" onClick={e => handleSteps(e, +1)}>&gt;</div>

      </div>

  );
}

export default DataSlider;

