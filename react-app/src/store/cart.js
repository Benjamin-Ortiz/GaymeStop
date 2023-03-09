const GET_CART = 'carts/GET_CART';
const POST_CARTITEM = "carts/POST_CARTITEM";
const PUT_CARTITEM = "carts/EDIT_CART";
const DELETE_CARTITEM = "carts/DELETE_CART";

const getCart = (cart) => {
    return{
        type: GET_CART,
        payload: cart
    }
}

const postCartItem = (cartItem) => {
    return {
        type: POST_CARTITEM,
        payload: cartItem,
    }
}

const putCartItem = (cartItemData, productId) => {
    return {
        type: PUT_CARTITEM,
        cartItemData,
        productId: productId,
    }
}

const deleteCartItem = (cartItemId) => {
    return {
        type: DELETE_CARTITEM,
        cartItemId,

    }
}

//todo THUNKS

//*GET ONE
export const getTheCart = (id) => async (dispatch) => {
    const response = await fetch(`/api/carts/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getCart(data));
        return data;
    }
}

// * POST
export const postTheCartItem = (cartItem) => async (dispatch) => {
    const {user_id, product_id, quantity} = cartItem

    console.log(cartItem, "CART ITEM THUNK");

    const response = await fetch(`/api/carts/add_product/${product_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            product_id,
            quantity
        })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(postCartItem(data))
        return response;
    }
}


// * EDIT

export const putTheCartItem = (cartItemData, id, product_id) => async dispatch => {

    const response = await fetch(`/api/carts/${id}/edit_product/${product_id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(cartItemData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(putCartItem(data, id, product_id));

      return response;
    }


  };


  // * DELETE
export const deleteTheCartItem = (cart_id,product_id) => async (dispatch) => {
    const response = await fetch(`/api/carts/${cart_id}/delete_all_items/${product_id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCartItem(cart_id,product_id));
        return data;
    }
}


//* reducer
let initialState = {};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CART:{
            const newState = {...action.payload.cart};

            return newState;
          }

          case POST_CARTITEM : {
            const newState = {
                ...state,
                [action.payload.c]: action.payload
            }
            return newState;
          }

        // case GET_PRODUCT: {
        //     const newState = {
        //         ...action.payload
        //     }
        //     return newState;
        // }

        case DELETE_CARTITEM: {
            const newState = { ...state }
            delete newState[action.id];
            return newState
          }


          case PUT_CARTITEM:
            return {
                ...state,
                [action.id] : action.cartItemData
            }

                //* action reference
            // const putCartItem = (cartId, cartItemId) => {
            //     return {
            //         type: PUT_PRODUCT,
            //         cartItemId,
            //         id: cartId,
            //     }
            // }



        default:
            return state
    }
}

export default cartReducer;
