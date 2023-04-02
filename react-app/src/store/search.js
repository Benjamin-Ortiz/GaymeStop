const GET_SEARCH = 'searches/GET_SEARCH';


const getSearch = (query) => {
    return{
        type: GET_SEARCH,
        payload: query,
    }
}

//todo THUNKS

//*GET SEARCH
export const getTheSearch = (query) => async (dispatch) => {
    const response = await fetch(`/api/searches/products/${query}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSearch(data));
        return data;
    }
}

//* reducer
let initialState = {};

const searchReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_SEARCH:{
            const newState = {...action.payload.search};

            //  action.payload.searchResults.forEach(element => {
                //     newState[element.id] = element
                //  });

            console.log(newState, 'SEARCH REDUCERRRRRRRRR');
            // action.payload.searchResults
            return newState;
          }

        default:
            return state
    }
}

export default searchReducer;
