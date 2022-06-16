const PizzaReducer = (state, action) => {
  switch (action.type) {
    case "GET_PIZZA":
      return {
        ...state,
        pizzas: action.payload,
        loading: false,
      };
    case "GET_SORT":
      return {
        ...state,
        sort: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default PizzaReducer;
