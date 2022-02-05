// TODO: use as global.d.ts after resolving jest not being able to find from there.
export type apiStatus = {
    state: apiState;
    error: string | null;
};

export enum apiState {
    SUCCESS = 'SUCCESS',
    LOADING = 'LOADING',
    FAILURE = 'FAILURE',
    PRISTINE = 'PRISTINE'
}
