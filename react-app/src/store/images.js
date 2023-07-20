const GET_IMAGES = "images/GET_IMAGES"
const POST_IMAGE = "images/POST_IMAGE";


const getImages = (images) => {
  return {
    type: GET_IMAGES,
    payload: images
  }
}

const postImage = (url) => {
  return {
    type: POST_IMAGE,
    payload: url,
  };
};



//* thunks


export const getTheImages = () => async (dispatch) => {
  const res = await fetch('/api/images/upload');

  if (res.ok) {
    const data = await res.json();

    dispatch(getImages(data))
    return data
  }
}


export const addImage = (formData) => async (dispatch) => {

  const res = await fetch('/api/images/upload', {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const new_image = await res.json();
    dispatch(postImage(new_image));

    return new_image;
  } else {
    const response = await res.json();
    return { ok: false, errors: response.errors };
  }
};

let initialState = null;

const imagesReducer = (state = initialState, action) => {

  switch (action.type) {

    case POST_IMAGE: {

      const newState = {

        [action.payload]: action.payload.url //Get Id and get this out
      }
      console.log(action.payload, "REDUCER PAYLOAD")
      return newState;
    }

    default:
      return state;
  }
};

export default imagesReducer
