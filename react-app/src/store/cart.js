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
        cartItem,
    }
}

const putCartItem = (payload) => {
    return {
        type: PUT_CARTITEM,
        payload: payload,
    }
}

const deleteCartItem = (cartItemId) => {
    return {
        type: DELETE_CARTITEM,
        cartItemId,

    }
}

//todo THUNKS

//*GET CART
export const getTheCart = (userId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${userId}/cart`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getCart(data));
        return data;
    }
}

// * POST
export const postTheCartItem = (cartItem) => async (dispatch) => {
    const {user_id, product_id, quantity} = cartItem

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

export const putTheCartItem = (cartItemData) => async dispatch => {
   const {id, user_id, quantity, product_id} = cartItemData;

    console.log(id ,' ID EDIT THUNK!!!--> CART DATA', cartItemData);

    const response = await fetch(`/api/carts/edit_product/${cartItemData.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(
        cartItemData
        ),
    });


    if (response.ok) {
      const data = await response.json();
      dispatch(putCartItem(data));
      return response;
    }


  };


  //* DELETE
export const deleteTheCartItem = (id) => async (dispatch) => {
    const response = await fetch(`/api/carts/delete_all_items/${id}`, {
        method: "DELETE"
    });



    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCartItem(id));
        return data;
    }
}


//* reducer
let initialState = {};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CART:{
            const newState = {...action.cart};

            return newState;
          }

          case POST_CARTITEM : {
            const newState = {
                ...state,
                [action.id]: action.payload
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
            const newState = { ...state };
            delete newState[action.cartItemId];
            return newState;
        }


          case PUT_CARTITEM:
            return {
                ...state,
                [action.payload.id] : action.payload
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
