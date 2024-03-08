import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

// The Food object that drives the list.
export interface Food {
  name: string;
  description: string;
}

// State: The current state of the list.
interface FoodState {
  // The foods currently in the list.
  foods: Food[];
  // The name the new food the user types in the input.
  newFoodName: string;
  // The description the new food the user types in the input.
  newFoodDescription: string;
}

// Action: Any action that can be sent from user interaction.
type FoodAction =
  | {type: 'ADD_FOOD'}
  | {type: 'DELETE_FOOD'; payload: number}
  | {type: 'NEW_FOOD_NAME_CHANGED'; payload: string}
  | {type: 'NEW_FOOD_DESCRIPTION_CHANGED'; payload: string};

interface FoodContextProps {
  state: FoodState;
  dispatch: Dispatch<FoodAction>;
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

// Reducer: The object that takes an action called from UI and proceeds to modify state from that action.
const foodReducer = (state: FoodState, action: FoodAction): FoodState => {
  switch (action.type) {
    case 'ADD_FOOD':
      if (state.newFoodName.trim() !== '') {
        return {
          ...state,
          foods: [
            ...state.foods,
            {name: state.newFoodName, description: state.newFoodDescription},
          ],
          newFoodName: '',
          newFoodDescription: '',
        };
      } else {
        return {...state};
      }

    case 'DELETE_FOOD':
      const updatedFoods = [...state.foods];
      updatedFoods.splice(action.payload, 1);
      return {...state, foods: updatedFoods};
    case 'NEW_FOOD_NAME_CHANGED':
      return {...state, newFoodName: action.payload};
    case 'NEW_FOOD_DESCRIPTION_CHANGED':
      return {...state, newFoodDescription: action.payload};
    default:
      return state;
  }
};

const FoodProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(foodReducer, {
    foods: [],
    newFoodName: '',
    newFoodDescription: '',
  });

  return (
    <FoodContext.Provider value={{state, dispatch}}>
      {children}
    </FoodContext.Provider>
  );
};

const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};

export {FoodProvider, useFoodContext};
