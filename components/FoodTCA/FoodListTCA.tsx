import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';

import FoodItemTCA from './FoodItemTCA';

import {useFoodContext, Food} from './FoodContext';

// The list that displays the food if the user has created foods.
export const FoodListTCA: React.FC = () => {
  const {state, dispatch} = useFoodContext();

  // The row passed into the FlatList
  const renderItem = ({item, index}: {item: Food; index: number}) => (
    <FoodItemTCA
      item={item}
      index={index}
      onDelete={index => dispatch({type: 'DELETE_FOOD', payload: index})}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>
          Foods List
        </Text>
        <TextInput
          placeholder="Food Name"
          value={state.newFoodName}
          onChangeText={text =>
            dispatch({type: 'NEW_FOOD_NAME_CHANGED', payload: text})
          }
          style={{marginBottom: 8, padding: 8, borderWidth: 1}}
        />
        <TextInput
          placeholder="Food Description"
          value={state.newFoodDescription}
          onChangeText={text =>
            dispatch({type: 'NEW_FOOD_DESCRIPTION_CHANGED', payload: text})
          }
          style={{marginBottom: 8, padding: 8, borderWidth: 1}}
        />
        <Button title="Add Food" onPress={() => dispatch({type: 'ADD_FOOD'})} />
        <FlatList
          data={state.foods}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
