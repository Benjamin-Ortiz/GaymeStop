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

const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        id: id
    }
}

//* thunks
// * GET ALL
export const getTheProducts = () => async (dispatch) => {
    const response = await fetch('/api/products/');

    if (response.ok) {
        const data = await response.json();

        dispatch(getProducts(data));
        return data;
    }
}

//*GET ONE
export const getTheProduct = (productId) => async (dispatch) => {
    const response = await fetch(`api/products/${productId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getProduct(data));
        return data;
    }
}

// * POST
export const postTheProduct = (productData) => async (dispatch) => {
    // const {user,
    //     title,
    //     price,
    //     rating,
    //     description,
    //     glitter_factor,
    //     product_image
    // } = productData

    const response = await fetch("/api/products/new_product", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    if (response.ok) {
        const newProduct = await response.json()
        dispatch(postProduct(newProduct))
    }
}

// * EDIT

export const putTheProduct = (productData, productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(productData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(putProduct(data, productId));

      return data;
    }
  };


// * DELETE
export const deleteTheProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteProduct(productId));
        return data;
    }
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
            // let newState = {};
            // newState = Object.assign({}, state);

            // newState.product = action.payload
            // return newState
            return {"message":" yerrrr"}
        }

        case PUT_PRODUCT: {
            const newState = Object.assign({}, state);
            newState.products = action.payload;

            return newState;
        }

        case DELETE_PRODUCT:{

            const newState = {...state, ...state.products}
             delete newState[action.productId]
             return newState
          }



        default:
            return state
    }
}

export default productsReducer;
