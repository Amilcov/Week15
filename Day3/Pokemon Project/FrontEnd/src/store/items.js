export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId,
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item,
});

const add = (item) => ({
  type: ADD_ITEM,
  item,
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId,
});

const initialState = {};


export const getItems = (pokemonId) => async dispatch  => {
   const response = await fetch(`/api/pokemon/${pokemonId}/items`);

   if (response.ok) {
      const items = await response.json();
      dispatch(load(items, pokemonId));
   }

}

export const updateItem = (item) => async dispatch => {
  console.log('store- item -updateItem function', item);
   const response = await fetch(`/api/items/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"

    },
    body: JSON.stringify(item)
   });

   if (response.ok) {
    const item = await response.json();
    dispatch(update(item));
    return item;
   } else {
    alert('Error on update item', response);
  }
}

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    }
    case REMOVE_ITEM: {
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    }
    case ADD_ITEM:
    case UPDATE_ITEM: {
      console.log('Store -> Reducer -> UPDATE_ITEM action', { ...state, [action.item.id]: action.item});
      return {
        ...state,
        [action.item.id]: action.item,
      };
    }
    default:
      return state;
  }
};

export default itemsReducer;
