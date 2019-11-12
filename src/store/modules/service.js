const UPDATE_SERVICES = "service/UPDATE_SERVICES";

export const updateServices = services => ({type: UPDATE_SERVICES, services});

const initialState = {
    services: []
};

export default function serviceReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_SERVICES:
            return {
                ...state,
                services: action.services
            };
        default:
            return state;
    }
}
