const UPDATE_RESULTS = "result/UPDATE_RESULTS";
const UPDATE_RESULT = "result/UPDATE_RESULT";

export const updateResults = results => ({type: UPDATE_RESULTS, results});
export const updateResult = result => ({type: UPDATE_RESULT, result});

const initialState = {
    results: [],
    result: {},
};

export default function resultReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_RESULTS:
            return {
                ...state,
                results: action.results
            };
        case UPDATE_RESULT:
            return {
                ...state,
                results: action.result
            };
        default:
            return state;
    }
}
