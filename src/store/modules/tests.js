const UPDATE_TESTS = "test/UPDATE_TESTS";
const UPDATE_TEST = "test/UPDATE_TEST";

export const updateTests = tests => ({type: UPDATE_TESTS, tests});
export const updateTest = test => ({type: UPDATE_TEST, test});

const initialState = {
    tests: [],
    test: {},
};

export default function testReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_TESTS:
            return {
                ...state,
                tests: action.tests
            };
        case UPDATE_TEST:
            console.log("update_test: ", action.test);
            return {
                ...state,
                test: action.test
            };
        default:
            return state;
    }
}
