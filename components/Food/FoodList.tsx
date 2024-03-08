// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';

// interface Food {
//   name: string;
//   description: string;
// }

// // export interface FoodItemProps {
// //   item: {
// //     name: string;
// //     description: string;
// //   };
// //   index: number;
// //   onDelete: (index: number) => void;
// // }

// // const FoodItem: React.FC<FoodItemProps> = ({item, index, onDelete}) => {
// //   return (
// //     <View
// //       style={{
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginTop: 8,
// //       }}>
// //       <Text>{`${item.name} - ${item.description}`}</Text>
// //       <Button title="Delete" onPress={() => onDelete(index)} />
// //     </View>
// //   );
// // };

// export type FoodType = {
//   item: {
//     name: string;
//     description: string;
//   };
//   index: number;
//   onDelete: (index: number) => void;
// };

// function FoodItem(props: FoodType) {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: 8,
//       }}>
//       <Text>{`${props.item.name} - ${props.item.description}`}</Text>
//       <Button title="Delete" onPress={() => props.onDelete(props.index)} />
//     </View>
//   );
// }

// const FoodList: React.FC = () => {
//   const [foods, setFoods] = useState<Food[]>([]);
//   const [newFood, setNewFood] = useState<Food>({name: '', description: ''});

//   const addFood = () => {
//     if (newFood.name.trim() !== '') {
//       setFoods([...foods, newFood]);
//       setNewFood({name: '', description: ''});
//     }
//   };

//   const deleteFood = (index: number) => {
//     const updatedFoods = [...foods];
//     updatedFoods.splice(index, 1);
//     setFoods(updatedFoods);
//   };

//   const renderItem = ({item, index}: {item: Food; index: number}) => (
//     <FoodItem item={item} index={index} onDelete={deleteFood} />
//   );

//   return (
//     <View style={{flex: 1, padding: 20}}>
//       <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>
//         Foods List
//       </Text>
//       <TextInput
//         placeholder="Food Name"
//         value={newFood.name}
//         onChangeText={text => setNewFood({...newFood, name: text})}
//         style={{marginBottom: 8, padding: 8, borderWidth: 1}}
//       />
//       <TextInput
//         placeholder="Food Description"
//         value={newFood.description}
//         onChangeText={text => setNewFood({...newFood, description: text})}
//         style={{marginBottom: 8, padding: 8, borderWidth: 1}}
//       />

//       <Button title="Add Food" onPress={addFood} />

//       <FlatList
//         data={foods}
//         keyExtractor={(item, index) => `${item.name}-${index}`}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default FoodList;
