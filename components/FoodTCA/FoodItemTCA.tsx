import {View, Text, Button} from 'react-native';

// The structure the row is provided to display information.
export type FoodItemTCAType = {
  item: {
    name: string;
    description: string;
  };
  index: number;
  onDelete: (index: number) => void;
};

// The row displayed in the list.
export default function FoodItemTCA(props: FoodItemTCAType) {
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
