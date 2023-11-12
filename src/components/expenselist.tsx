import { FlatList, View } from "react-native";
import ExpenseItem from "./button";


export default function ExpenseList (props:any){
    return (
        <View>
 <FlatList
        data={props.expenses}
        renderItem={({ item }) => (
          <ExpenseItem expense={item}
            onDelete={() => props.deleteExpense(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

        </View>
    );
}