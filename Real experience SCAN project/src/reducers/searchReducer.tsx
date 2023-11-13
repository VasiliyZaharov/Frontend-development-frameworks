interface DataItem {
    id: number;
    name: string;

}
type DocumentItem = {
    id: string;
}

interface SearchDataState {
    data: DataItem[] | null;
    documentData: DocumentItem[] | null;
    documents: myDocument[] | null;
    loading: boolean;
    error: null | string;
}

interface FetchDataSuccessAction {
    type: 'FETCH_DATA_SUCCESS';
    payload: DataItem[];
}

interface FetchDataFailAction {
    type: 'FETCH_DATA_FAIL';
    payload: string;
}
interface FetchDocumentsSuccessAction {
    type: 'FETCH_DOCUMENTS_SUCCESS';
    payload: myDocument[];
}

interface FetchDocumentsFailAction {
    type: 'FETCH_DOCUMENTS_FAIL';
    payload: string;
}

export interface myDocument {
    ok: OkObject;

}

interface OkObject {
    schemaVersion: string;
    id: string;
    version: number;
    issueDate: string;
    url: string;
    source: Source;
    dedupClusterId: string;
    title: TextMarkup;
    content: TextMarkup;
    entities: Entities;
    attributes: Attributes;
    language: string;
}

interface Source {
    id: number;
    groupId: number;
    name: string;
    categoryId: number;
    levelId: number;
}

interface TextMarkup {
    text?: string;
    markup: string;
}

interface Entities {
    companies: Company[];
    people: any[];
    themes: Theme[];
    locations: Location[];
}

interface Company {
    suggestedCompanies: SuggestedCompany[];
    resolveInfo: ResolveInfo;
    tags: string[];
    isSpeechAuthor: boolean;
    localId: number;
    name: string;
    entityId: number;
    isMainRole: boolean;
}

interface SuggestedCompany {
    sparkId: number;
    inn: string;
    ogrn: string;
    searchPrecision: string;
}

interface ResolveInfo {
    resolveApproaches: string[];
}

interface Theme {
    localId: number;
    name: string;
    entityId: number;
    tonality: string;
    participant?: Participant;
}

interface Participant {
    localId: number;
    type: string;
}

interface Location {
    code: Code;
    localId: number;
    name: string;
    isMainRole: boolean;
}

interface Code {
    countryCode: string;
    regionCode: string;
}

interface Attributes {
    isTechNews: boolean;
    isAnnouncement: boolean;
    isDigest: boolean;
    influence: number;
    wordCount: number;
    coverage: Coverage;
}

interface Coverage {
    value: number;
    state: string;
}


export type SearchActionTypes = FetchDataSuccessAction | FetchDataFailAction | FetchDocumentsSuccessAction | FetchDocumentsFailAction;

const initialState: SearchDataState = {
    data: null,
    documentData: null,
    documents: null,
    loading: false,
    error: null,
};

export const searchDataReducer = (state: SearchDataState = initialState, action: SearchActionTypes): SearchDataState => {
    switch (action.type) {
        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            };
        case "FETCH_DATA_FAIL":
            return {
                ...state,
                data: null,
                loading: false,
                error: action.payload,
            };
        case "FETCH_DOCUMENTS_SUCCESS":
            return {
                ...state,
                documents: action.payload,
                loading: false,
                error: null,
            };
        case "FETCH_DOCUMENTS_FAIL":
            return {
                ...state,
                documentData: null,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default searchDataReducer;
export { SearchDataState };
