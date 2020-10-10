export const initialState = {
    data: [],
    countries: [],
    tableCountries: [],
    countryInfo: {},
    countryCode: '',
    center: {
        lat: 34.80746, lng: 78.9629
    },
    zoom: 2,
    case_type: 'cases'
}

export const actionTypes = {
    SET_DATA: "SET_DATA",
    SET_CASE_TYPE: "SET_CASE_TYPE",
    SET_COUNTRIES: "SET_COUNTRIES",
    SET_TABLE_COUNTRIES: "SET_TABLE_COUNTRIES",
    SET_COUNTRY_INFO: "SET_COUNTRY_INFO",
    SET_COUNTRY_CODE: "SET_COUNTRY_CODE",
    SET_MAP_CENTER: "SET_MAP_CENTER",
    SET_MAP_ZOOM: "SET_MAP_ZOOM"
}

const Reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case actionTypes.SET_CASE_TYPE: {
            return {
                ...state,
                case_type: action.case_type
            }
        }
        case actionTypes.SET_COUNTRIES: {
            return {
                ...state,
                countries: action.countries
            }
        }
        case actionTypes.SET_COUNTRY_INFO: {
            return {
                ...state,
                countryInfo: action.countryInfo
            }
        }
        case actionTypes.SET_COUNTRY_CODE: {
            return {
                ...state,
                countryCode: action.countryCode
            }
        }
        case actionTypes.SET_TABLE_COUNTRIES: {
            return {
                ...state,
                tableCountries: action.tableCountries
            }
        }
        case actionTypes.SET_MAP_CENTER: {
            return {
                ...state,
                center: action.center
            }
        }
        case actionTypes.SET_MAP_ZOOM: {
            return {
                ...state,
                zoom: action.zoom
            }
        }
        default: {
            return state;
        }
    }
}

export default Reducer;