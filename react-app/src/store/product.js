const GET_PRODUCTS = 'products/GET_PRODUCTS';
const GET_PRODUCT = 'products/GET_PRODUCT';
const POST_PRODUCT = "products/POST_PRODUCT";
const PUT_PRODUCT = "products/EDIT_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";

const getProducts = (products) => {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

const getProduct = (product) => {
    return{
        type: GET_PRODUCT,
        payload: product
    }
}

const postProduct = (product) => {
    return {
        type: POST_PRODUCT,
        payload: product
    }
}

const putProduct = (product) => {
    return {
        type: PUT_PRODUCT,
        payload: product
    }
}

const deleteQuestion = (id) => {
    return {
        type: DELETE_PRODUCT,
        id: id
    }
}

//* thunks

export const getTheProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/');

    if (res.ok) {
        const data = await res.json();

        dispatch(getProducts(data));
        return data;
    }
}

export const getTheProduct = (id) => async (dispatch) => {
    const response = await fetch(`api/products/${id}`);

    
}


//* reducer
let initialState = {};

const productsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_PRODUCTS:{
            const allProducts = [];

            action.payload.products.forEach( (product) => {
                allProducts[product.id] = product;
            });
            return { ...allProducts }
        }


        case GET_PRODUCT: {
            let newState = {};
            newState.product = action.payload

        }



        default:
            return state
    }
}

export default productsReducer;
