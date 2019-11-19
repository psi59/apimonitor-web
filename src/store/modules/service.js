const UPDATE_SERVICES = "service/UPDATE_SERVICES";
const UPDATE_SERVICE = "service/UPDATE_SERVICE";

export const updateServices = services => ({type: UPDATE_SERVICES, services});
export const updateService = service => ({type: UPDATE_SERVICE, service});

const initialState = {
    services: [],
    service: {},
};

export default function serviceReducer(state=initialState, action) {
    switch (action.type) {
        case UPDATE_SERVICES:
            return {
                ...state,
                services: action.services
            };
        case UPDATE_SERVICE:
            return {
                ...state,
                service: action.service
            };
        default:
            return state;
    }
}
