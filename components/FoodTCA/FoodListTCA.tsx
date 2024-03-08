// components/FoodList.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useFoodContext} from './FoodContext';

interface Food {
  name: string;
  description: string;
}

export type FoodType = {
  item: {
    name: string;
    description: string;
  };
  index: number;
  onDelete: (index: number) => void;
};

function FoodItemTCA(props: FoodType) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
      }}>
      <Text>{`${props.item.name} - ${props.item.description}`}</Text>
      <Button title="Delete" onPress={() => props.onDelete(props.index)} />
    </View>
  );
}

export const FoodListTCA: React.FC = () => {
  const {state, dispatch} = useFoodContext();
  const [newFood, setNewFood] = React.useState({name: '', description: ''});

  const addFood = () => {
    if (newFood.name.trim() !== '') {
      dispatch({type: 'ADD_FOOD', payload: newFood});
      setNewFood({name: '', description: ''});
    }
  };

  const deleteFood = (index: number) => {
    dispatch({type: 'DELETE_FOOD', payload: index});
  };

  const renderItem = ({item, index}: {item: Food; index: number}) => (
    <FoodItemTCA item={item} index={index} onDelete={deleteFood} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>
          Foods List
        </Text>
        <TextInput
          placeholder="Food Name"
          value={newFood.name}
          onChangeText={text => setNewFood({...newFood, name: text})}
          style={{marginBottom: 8, padding: 8, borderWidth: 1}}
        />
        <Button title="Add Food" onPress={addFood} />
        <FlatList
          data={state.foods}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
