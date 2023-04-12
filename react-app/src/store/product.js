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
        product
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
export const getTheProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getProduct(data));
        return data;
    }
}

// * POST
export const postTheProduct = (productData) => async (dispatch) => {
    const {title, price, description, glitter_factor, product_image} = productData

    const response = await fetch("/api/products/new_product", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            price,
            description,
            glitter_factor,
            product_image,
        })
    })
    if (response.ok) {
        const newProduct = await response.json()
        // dispatch(postProduct(newProduct))
        return response;
    }
}

// * EDIT

export const putTheProduct = (product) => async dispatch => {
    // const {id, title, price, description, glitter_factor, product_image} = product
    console.log(product, "THUNKK");

    const response = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(product),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(putProduct(data));

      return response;
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
            let newState = {...state};

            action.payload.products.forEach((product) => { //* returns products indexed by its pk
                    newState[product.id] = product;
                  });
                  return newState;

          }


        case GET_PRODUCT: {
            const newState = {
                ...action.payload
            }
            return newState;
        }


        case DELETE_PRODUCT:{
            const newState = { ...state }

            delete newState[action.id];
            return newState
          }

          case POST_PRODUCT : {
            const newState = {
                ...state,
                [action.payload.product]: action.payload //Get Id and get this out
            }
            return newState;
          }

          case PUT_PRODUCT:
            return {
                ...state,
                [action.product.id] : action.product
            }



        default:
            return state
    }
}

export default productsReducer;
