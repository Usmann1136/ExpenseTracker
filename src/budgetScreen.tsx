import React, { useState, useEffect } from 'react';
import { View, Text,  TextInput, FlatList, TouchableOpacity, StyleSheet, Pressable, ScrollView, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseList from './components/expenselist';
import { Picker } from '@react-native-picker/picker';


interface Expense {
  title: string;
  amount: number;
  date: string;
  description?: string; // New description field
  category?: string; // New category field
}

const BudgetApp: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<string>('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [expensesError, setExpensesError] = useState(false)
  const [newExpensesError, setnewExpensesError] = useState(false)
  const [newAmountError, setnewAmountError] = useState(false)
  const [newDateError, setnewDataError] = useState(false)
  const [newDescriptionError, setnewDescriptionError] = useState(false)
  const [newCategoryError, setNewCategoryErroe] = useState(false);
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const saveExpenses = async (updatedExpenses: Expense[]) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const addExpense = () => {
    if (!newExpense) {
      setnewExpensesError(true)
    }
    else {
      setnewExpensesError(false)
    }
    if (!newAmount) {
      setnewAmountError(true)
    }
    else {
      setnewAmountError(false)
    }

    if (!newDate) {
      setnewDataError(true)
    } else {
      setnewDataError(false)
    }
    if (!newDescription) {
      setnewDescriptionError(true)
    } else {
      setnewDescriptionError(false)
    }
    if (!newCategory) {

      setNewCategoryErroe(true)
    } else {
      setNewCategoryErroe(false)
    }
    if (!newExpense || !newAmount || !newDate|| !newDescription || !newCategory) {
      return false;
    }

    const updatedExpenses = [
      ...expenses,
      {
        title: newExpense,
        amount: parseFloat(newAmount),
        date: newDate,
        description: newDescription,
        category: newCategory,
      },
    ];

    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);

    setNewExpense('');
    setNewAmount('');
    setNewDate('');
    setNewDescription('');
    setNewCategory('');
    
  };

  const deleteExpense = (expense: Expense) => {
    const updatedExpenses = expenses.filter((item) => item !== expense);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalBudget(total);
  }, [expenses]);

  return (
    <View style={{flex:1 , backgroundColor:'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
    <ScrollView>
      <View  style={styles.expense}>
        <Image style={{height:35,
      width:35,}} source={require('../assets/images/iconsexpense48.png')}/>
      <Text style={{ 
      fontSize:25,
      marginLeft:5,
      fontFamily:'400',
      color:'#3A5F0B'}}>Expense Form</Text>
      </View>
     
      <TextInput
        style={styles.inputfield}
        placeholder=" Enter Expense Title"
        value={newExpense}
        keyboardType='ascii-capable'
        onChangeText={(text) => setNewExpense(text)}
      />
      {
        newExpensesError ? <Text style={styles.errorText}>Enter a title</Text> :null
      }
      <TextInput
        style={styles.inputfield}
        placeholder=" Enter Expense Amount"
        value={newAmount}
    
        onChangeText={(text) => setNewAmount(text)}
        keyboardType="numeric"
      />
      {
        newAmountError ? <Text style={styles.errorText}>Enter a Amount</Text> :null
      }
         <TextInput
        style={styles.inputfield}
        placeholder="Enter Expense Date"
        value={newDate}
        keyboardType='numeric'
        onChangeText={(text)=> setNewDate(text)}
      />
  
      {
        newDateError ?  <Text style={styles.errorText}>Enter a Date</Text> :null
      }
      <TextInput
        style={styles.inputfield}
        placeholder="Enter Expense Description"
        value={newDescription}
        keyboardType='ascii-capable'
        onChangeText={(text) => setNewDescription(text)}
      />
        {
        newDescriptionError ?  <Text style={styles.errorText}>Enter a Description</Text> :null
      }
      <View style={styles.pickerfield}>
      <Picker

  selectedValue={newCategory}
  onValueChange={(itemValue) => setNewCategory(itemValue)}
>
  <Picker.Item label="Select a category" value="" />
  <Picker.Item label="Home" value="Home" />
  <Picker.Item label="Grocery" value="Grocery" />
  <Picker.Item label="Education" value="Education" /> 
  <Picker.Item label="Food" value="Food" />
  <Picker.Item label="Emergency Fund" value="Emergency Fund" />
  <Picker.Item label="Children's Expenses" value="Children's Expenses" />
  <Picker.Item label="Travel" value="Travel" />
  <Picker.Item label="Taxes" value="Taxes" />
  <Picker.Item label="Healthcare" value="Healthcare" />
  <Picker.Item label="Personal Care" value="Personal Care" />
  <Picker.Item label="Home Appliances" value="Home Appliances" />
  {/* Add more categories as needed */}
</Picker>
      </View>
  
{newCategoryError ? <Text style={styles.errorText}>Select a category</Text> : null}

    
      <Pressable onPress={addExpense}>
        <Text style={styles.button}>
          Add Expense
        </Text>
      </Pressable>

      <Text style={styles.budgetstate}>Total Expense: ₨ {totalBudget.toFixed(2)}</Text>

     <ExpenseList expenses={expenses} deleteExpense={deleteExpense}/>
     </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  budgetstate:{
    textAlign:'center',
    fontSize:25,
    color: '#3A5F0B',
  },
  expense:{
    marginTop:40,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  pickerfield:{
borderColor:'#3A5F0',
  borderWidth:2,
  borderRadius: 10,
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 15,
  },
  inputfield: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: '#3A5F0B',
    paddingHorizontal: 20,
  },
  
  button: {
    backgroundColor: '#3A5F0B',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText:{
    color:'red',
    marginHorizontal:20,
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});

export default BudgetApp;