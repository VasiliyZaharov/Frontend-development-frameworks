import React from 'react';
import axios from "axios";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {AuthState} from "../../reducers/reduser";
import {SearchDataState} from "../../reducers/searchReducer";
import '../../styles/SearchPage.scss';

const inn = '9702009530 6449013711'; //SkillFactory and another inn for small response
export interface RootState {
  auth: AuthState;
  searchData: SearchDataState;
}


interface ValidationError {
  code: number;
  message: string;
}

function validateInn(inn: string | number, error: ValidationError): boolean {
  let result = false;

  if (typeof inn === 'number') {
    inn = inn.toString();
  } else if (typeof inn !== 'string') {
    inn = '';
  }

  if (!inn.length) {
    error.code = 1;
    error.message = 'TIN in empty';
  } else if (/[^0-9]/.test(inn)) {
    error.code = 2;
    error.message = 'TIN can only consist of numbers';
  } else if (![10, 12].includes(inn.length)) {
    error.code = 3;
    error.message = 'TIN can only consist of 10 or 12 digits';
  } else {
    const checkDigit = (inn: string, coefficients: number[]): number => {
      let n = 0;
      for (let i = 0; i < coefficients.length; i++) {
        n += coefficients[i] * Number(inn[i]);
      }
      return n % 11 % 10;
    };

    switch (inn.length) {
      case 10:
        const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n10 === Number(inn[9])) {
          result = true;
        }
        break;

      case 12:
        const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n11 === Number(inn[10]) && n12 === Number(inn[11])) {
          result = true;
        }
        break;
    }

    if (!result) {
      error.code = 4;
      error.message = 'Incorrect check number';
    }
  }

  return result;
}

const error: ValidationError = { code: 0, message: '' };
const isValid = validateInn('7710137066', error);
if (!isValid) {
  console.log(`Validation failed: ${error.message}`);
}

const SearchComponent: React.FC = () => {
    //for searching
    const [inn, setInn] = useState<string>('');
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [limit, setLimit] = useState<string>('1000');
    const [tonality, setTonality] = useState<string>('Any');

    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // for validation
    const [limitError, setLimitError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    const [innError, setInnError] = useState<string | null>(null);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        let allValid = true;

        const error: ValidationError = { code: 0, message: '' };
        const validationResult = validateInn(inn, error);

        if (!validationResult) {
            setInnError(`Validation failed: ${error.message}`);
            allValid = false;
          } else {
            setInnError(null);
        }

        // validate limit
        const limitNumber = parseInt(limit, 10);
            if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 1000) {
              setLimitError('Limit must be a number between 1 and 1000.');
              allValid = false;
            } else {
              setLimitError(null);
            }

        // Validate dates
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        if (startDate > endDate) {
          setDateError('End date cannot be earlier than start date.');
          allValid = false;
        } else{
            setDateError(null);
        }

        if (!allValid) {
            return;
        }


        const payload = {
          issueDateInterval: {
            startDate: dateRange.start,
            endDate: dateRange.end
          },
          searchContext: {
            targetSearchEntitiesContext: {
              targetSearchEntities: [
                {
                  type: 'company',
                  inn: inn,
                  maxFullness: true,
                  inBusinessNews: null
                }
              ],
              onlyMainRole: true,
              tonality: tonality,
              onlyWithRiskFactors: false,
              riskFactors: {
                and: [],
                or: [],
                not: []
              },
              themes: {
                and: [],
                or: [],
                not: []
              }
            },
            themesFilter: {
              and: [],
              or: [],
              not: []
            }
          },
          searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: []
          },
          attributeFilters: {
            excludeTechNews: true,
            excludeAnnouncements: true,
            excludeDigests: true
          },
          similarMode: 'duplicates',
          limit: parseInt(limit, 1000),
          sortType: 'sourceInfluence',
          sortDirectionType: 'desc',
          intervalType: 'month',
          histogramTypes: ['totalDocuments', 'riskFactors']
        };
        function sleep(ms: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        try {
            const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms',
                payload,
               {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
               });
            console.log('Response: ',response.data);
             const objectSearchResponse = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const documentIds = objectSearchResponse.data.items.map((item: { encodedId: string }) => item.encodedId);// so here must be IDs
            console.log('documentIds :',documentIds)
            // request for the documents with the limit by 100
            const limitSize = 100;
                for (let i = 0; i < documentIds.length; i += limitSize) {
                    const hundredIds = documentIds.slice(i, i + limitSize);

                    console.log('ID slices:', hundredIds);

                    try {
                        const documentsResponse = await axios.post('https://gateway.scan-interfax.ru/api/v1/documents',
                            { ids: hundredIds },
                            {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                            }
                        );
                        await sleep(2000);
                        dispatch({
                            type: 'FETCH_DOCUMENTS_SUCCESS',
                            payload: documentsResponse.data
                        });
                    } catch (error) {
                        console.error('Error response:', response.data);
                    }
                }
            navigate('/resultpage', { state: {  responseData: response.data } });
        } catch (error) {
          console.error(`Error occurred: ${error}`);
        }
      };

    return (
        <form className="search-component-content" onSubmit={handleSearch}>
            <div className="search-component-inputs">
                <div className="search-input-1">
                <p id="checkbox-p">Company TIN<sup style={{color: innError? 'red' : ''}}>*</sup> </p>
                <input id="input_1"
                       type="text"
                       name="inn"
                       placeholder="10 digits"
                       className={innError ? 'input-error' : ''}
                       value={inn}
                       onChange={(e) => {
                             setInn(e.target.value);
                             setInnError(null);
                       }}
                />
                    {innError && <p className="error-message">{innError}</p>}
            </div>
                <div className="search-input-list"> <p id="checkbox-p">Tonality</p> </div>
                <input id="input_1" type="text" list="list" value={tonality} onChange={(e) => setTonality(e.target.value)}/>
                    <datalist id="list" placeholder="Any">
                        <option value="Any"/>
                        <option value="Positive"/>
                        <option value="Negative"/>
                    </datalist>
                <div className="search-input-3"><p id="checkbox-p">Number of documents to be issued<sup style={{color: limitError? 'red' : ''}}>*</sup></p></div>
                <input id="input_1"
                       type="text"
                       placeholder="from 1 to 1000"
                       className={limitError ? 'input-error' : ''}
                       min="1" max="1000"
                       value={limit}
                       onChange={(e) => {
                           setLimit(e.target.value);
                           setLimitError(null);
                       }}
                />
                {limitError && <p className="error-message">{limitError}</p>}
                <div className="search-input-4"> <p id="checkbox-p">Search range<sup style={{color: dateError? 'red' : ''}}>*</sup></p> </div>
                <form id="search-form">
                    <div className="date-range">
                        <input type="date"
                               id="start-date"
                               name="start-date"
                               className={dateError ? 'input-error' : ''}
                               onChange={(e) => {
                                   setDateRange({...dateRange, start: e.target.value});
                                   setDateError(null);
                               }}
                        />
                        <input type="date"
                               id="end-date"
                               name="end-date"
                               className={dateError ? 'input-error' : ''}
                               onChange={(e) => {
                                   setDateRange({...dateRange, end: e.target.value});
                                   setDateError(null);
                               }}
                        />
                        {dateError && <p className="error-message">{dateError}</p>}
                    </div>
                </form>
            </div>
            <div className="search-checkbox-button">
                <div className="search-checkbox">
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Sign of maximum completeness</p>
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Mentions in a business context</p>
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Main role in the publication</p>
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Publishing only with risk factors</p>
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Include technical market news</p>
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Include announcements and calendars</p>
                <p id="checkbox-p"><input type="checkbox" name="checkbox" value=""/> Include news bulletins</p>
            </div>
                <div className="search-down-part">
                    <button type="submit" className="search-button">Search</button>
                    <p id="bottom-p"> <sup>*</sup>Required fields</p>
                </div>
            </div>

        </form>
    )
}

export default SearchComponent;

