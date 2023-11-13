import { AuthState } from './reducers/reduser';
import { SearchDataState } from './reducers/searchReducer';

export interface RootState {
  auth: AuthState;
  searchData: SearchDataState;
}