/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const cartContext = createContext(null);

const ActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
    DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
};

const initialCartState = {
    cartItems: [],
    quantity: {}
};

function cartReducer(state, action) {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                quantity: {...state.quantity, [action.payload.id]: 1}
            };

        case ActionTypes.REMOVE_FROM_CART: {
            if (state.cartItems.length === 1) {
                return initialCartState
            }
            
            const itemToRemove = state.cartItems.find(item => item.id === action.payload.id);
            if (!itemToRemove) return state;
            const { [action.payload.id]: removedQuantity, ...restOfQuantities } = state.quantity; // to exclude the quantity of the removed item
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
                quantity: restOfQuantities
            };
        }

        case ActionTypes.CLEAR_CART:
            return initialCartState;

        case ActionTypes.INCREMENT_QUANTITY: {
            const incrementedId = action.payload.id;
            return {
                ...state,
                quantity: {
                    ...state.quantity,
                    [incrementedId]: (state.quantity[incrementedId] || 0) + 1
                }
            };
        }

        case ActionTypes.DECREMENT_QUANTITY: {
            const decrementedId = action.payload.id;
            return {
                ...state,
                quantity: {
                    ...state.quantity,
                    [decrementedId]: Math.max((state.quantity[decrementedId] || 0) - 1, 1) // to Prevent negative quantity
                }
            };
        }


        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);
    return (
        <cartContext.Provider value={{ cart, dispatch }}>
            {children}
        </cartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;
