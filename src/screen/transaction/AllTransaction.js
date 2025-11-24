import { useFocusEffect } from "@react-navigation/native";
import { getAllTransactions } from "../../api/Api";
import { useCallback, useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet, View, Text } from "react-native";

const AllTransaction = ({ navigation }) => {
    const [listTransaction, setListTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await getAllTransactions();
            setListTransaction(data);
            setLoading(false);
        } catch (error) {
            console.log("Error Loading Transaction List", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    )

    const renderTransaction = ({ item }) => (
        <TouchableOpacity style={styles.transactionCard} onPress={() => navigation.navigate("TransactionDetail", { transaction: item })}>

            <View style={styles.LableAndContent}>
                <Text style={styles.DateTime}>{item.id} - {formatDate(item.updatedAt)} </Text>
                <Text style={styles.Status}>{isCanceled(item.status)}</Text>
            </View>
            <View style={styles.serviceAndPrice}>
                <View>
                    {item.services.map((s) => (
                        <Text key={s._id} style={styles.serviceText}>
                            - {s.name}
                        </Text>
                    ))}
                </View>
                <View style={styles.Price}>
                    <Text style={styles.PriceText}>{formatMoney(item.price)}</Text>
                </View>
            </View>

            <View style={styles.LableAndContent}>
                <Text style={styles.CustomerText}>Customer: </Text>
                <Text style={styles.CustomerText}>{item.customer.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>TRANSACTION</Text>
            </View>

            <FlatList
                data={listTransaction}
                renderItem={renderTransaction}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={loadTransactions}
            >
            </FlatList>
        </View>
    )
};

const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const isCanceled = (status) => {
    if (status == 'cancelled') {
        return 'Cancelled';
    } else {
        return null;
    }
};

const formatMoney = (amount) => {
    return amount.toLocaleString("vi-VN") + " đ";
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#EF506B',
        paddingTop: 40
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 30
    },
    list: {
        padding: 15,
    },
    transactionCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    serviceAndPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    PriceText: {
        marginTop: 20,
        marginLeft: 40,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#EF506B',
        fontWeight: 'bold'
    },
    LableAndContent: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'row'
    },
    DateTime: {
        fontSize: 14,
        fontWeight: 'bold',
        flexDirection: 'row'
    },
    Status: {
        fontSize: 14,
        color: '#EF506B',
        fontWeight: 'bold'
    },
    CustomerText: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 'bold'
    }
})

export default AllTransaction;