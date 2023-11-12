import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface ExpenseItemProps {
    expense: {
        title: string;
        amount: number;
        date: string;
        description?: string;
        category?: string;
    };
    onDelete: () => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };
    return (

        <View style={styles.container}>
            <View >

                <Text style={styles.title}>Expense Title:</Text>

                <Text style={styles.date}>{expense.title}</Text>



                <Text style={styles.title}>Expense Date:</Text>
                <Text style={styles.date}>{expense.date}</Text>

            </View>
            <View>
                <Text style={styles.title}>Expense Amount:</Text>
                <Text style={styles.date}>{expense.amount !== null && expense.amount !== undefined
                    ? `₨ ${expense.amount.toFixed(2)}`
                    : 'Amount Not Available'}</Text>

                <Text style={styles.title}>Expense Description:</Text>
                <Text style={styles.description}>{expense.description}</Text>
                <Text style={styles.title}>Expense Category:</Text>
                <Text style={styles.category}>{expense.category}</Text>

            </View>

            <Text onPress={onDelete} style={styles.delete}>Delete</Text>
        </View>


    );
};

const styles = StyleSheet.create({


    button: {
        backgroundColor: '#3A5F0B',
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 20,
        elevation: 10,
    },
    delete: {
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 20,
    },
    container: {

        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 20,
        marginHorizontal: 20,
        backgroundColor: '#3A5F0B',
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#3A5F0B',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    date: {
        fontSize: 14,
        color: 'white',
        marginBottom: 20,

    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginHorizontal: 20,
    },
    description: {
        fontSize: 14,
        color: 'white',
        marginBottom: 20,

    },
    category: {
        fontSize: 14,
        color: 'white',
        marginBottom: 20,
    }
});

export default ExpenseItem;