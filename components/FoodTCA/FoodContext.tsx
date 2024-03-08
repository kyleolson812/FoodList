// components/FoodContext.tsx
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

interface Food {
  name: string;
  description: string;
}

interface FoodState {
  foods: Food[];
}

type FoodAction =
  | {type: 'ADD_FOOD'; payload: Food}
  | {type: 'DELETE_FOOD'; payload: number};

interface FoodContextProps {
  state: FoodState;
  dispatch: Dispatch<FoodAction>;
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

const foodReducer = (state: FoodState, action: FoodAction): FoodState => {
  switch (action.type) {
    case 'ADD_FOOD':
      return {...state, foods: [...state.foods, action.payload]};
    case 'DELETE_FOOD':
      const updatedFoods = [...state.foods];
      updatedFoods.splice(action.payload, 1);
      return {...state, foods: updatedFoods};
    default:
      return state;
  }
};

const FoodProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(foodReducer, {foods: []});

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
