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
        payload: product,
        // id : product.id
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
    const res = await fetch(`/api/products/${id}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getProduct(data));
        return data;
    }
}

// //* NEW POST THUNK
// export const postTheProduct = (formData) => async (dispatch) => {
//     const res = await fetch("/api/products/new_product", {
//       method: "POST",
//       body: formData,
//     });
//     console.log(formData, 'FORMDATAAAAAAAA');
//     if (res.ok) {
//       const newProduct = await res.json();
//       dispatch(postProduct(newProduct));
//       console.log(newProduct, "NEW PRODUCT THUNKKKKKK");

//       return { ok: true, id: newProduct.id };
//     } else {
//       const response = await res.json();
//       return { ok: false, errors: response.errors };
//     }
//   };

// * OLD POST
export const postTheProduct = (productData) => async (dispatch) => {
    const {title, price, description, glitter_factor, product_image} = productData
    console.log(productData,"POST THUNK PAYLOAD");

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
        console.log(newProduct,"POST THUNK RESPONSE");
        dispatch(postProduct(newProduct))
        return response;
    }
}

// * EDIT

export const putTheProduct = (product) => async dispatch => {


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

            action.payload.products.forEach((product, i) => { //* returns products indexed by its pk
                // console.log("INDEX", i, "length", action.payload.products.length -1);
                    newState[product.id] = product;
                  });
                  return newState;

          }


        case GET_PRODUCT: {
            let newState = {...state};
            return newState;
        }


        case DELETE_PRODUCT:{
            const newState = { ...state};

            delete newState[action.id];
            return newState
          }

          case POST_PRODUCT : {
            const newState = {
                ...state,
                //Get Id and get this out
                // [action.payload.product?.id]: action.payload
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
