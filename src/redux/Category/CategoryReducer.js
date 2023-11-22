import {CATEGORY_ACTION_TYPES} from './CategoryAction';

const initialState = {
  category: [],
  categoryIcons: [],
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORY:
      return {
        ...state,
        category: [...action.payload],
      };
    case CATEGORY_ACTION_TYPES.SET_CATEGORY_ICONS:
      return {
        ...state,
        categoryIcons: [...action.payload],
      };
    default:
      return state;
  }
};

export default CategoryReducer;
