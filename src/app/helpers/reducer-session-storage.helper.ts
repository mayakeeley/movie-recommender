import { ActionReducer } from '@ngrx/store';

export interface ISessionStorageReducerState {
  state: {};
  expiry?: Date;
}

let reducers: string[] = [];
let expiresAfter;

export function setReducersToStore(reducersToStore: string[]): void {
  reducers = reducersToStore;
}

export function setExpiresAfter(milliseconds: number): void {
  expiresAfter = milliseconds;
}

export function sessionStorageMiddleware(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state: any, action: any): any => {
    const nextState = reducer(state, action);
    const expiry = new Date();
    expiry.setMilliseconds(
      expiry.getMilliseconds() + (expiresAfter || 1800000)
    );

    for (const reducerName in nextState) {
      if (
        nextState.hasOwnProperty(reducerName) &&
        (reducers.length === 0 || reducers.includes(reducerName))
      ) {
        const storeObj: ISessionStorageReducerState = {
          state: nextState[reducerName],
          expiry,
        };

        sessionStorage.setItem(reducerName, JSON.stringify(storeObj));
      }
    }

    return nextState;
  };
}

export function getSessionStorageReducerState(
  reducerName: string,
  attemptMaintainOnDowngrade = false
): any {
  const value = sessionStorage.getItem(reducerName);

  if (value) {
    const storeObj: ISessionStorageReducerState = JSON.parse(value);
    if (!storeObj.expiry || new Date(storeObj.expiry) > new Date()) {
      return storeObj.state;
    }
  }

  return;
}

export function clearSessionStorage(): void {
  reducers.forEach((key) => sessionStorage.removeItem(key));
}
