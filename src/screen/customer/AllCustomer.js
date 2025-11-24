import { useFocusEffect } from "@react-navigation/native";
import { getAllCustomers } from "../../api/Api";
import { useCallback, useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";

const AllCustomers = ({ navigation }) => {
    const [listCustomer, setListCustomer] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const data = await getAllCustomers();
            setListCustomer(data);
            setLoading(false);
        } catch (error) {
            console.log("Error Loading Customer List", error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadCustomers();
        }, [])
    );

    const renderCustomer = ({ item }) => (
        <TouchableOpacity style={styles.customerCard} onPress={() => navigation.navigate("CustomerDetail", { customer: item })}>
            <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Customer: </Text>
                        <Text style={styles.Content}>{item.name}</Text>
                    </View>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Phone: </Text>
                        <Text style={styles.Content}>{item.phone}</Text>
                    </View>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Total Money: </Text>
                        <Text style={styles.Price}>{formatMoney(item.totalSpent)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>CUSTOMER</Text>
            </View>
            <Image source={require('../../image/logo_rtg.png')}
                style={styles.logo}></Image>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCustomer')}>
                <Text style={styles.addText}>Add Customer</Text>
            </TouchableOpacity>

            <FlatList
                data={listCustomer}
                renderItem={renderCustomer}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={loadCustomers}
            />


        </View>
    )
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
    logo: {
        width: '100%'
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
    customerCard: {
        flexDirection: 'row',
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
    cardContent: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3
    },
    leftContent: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    LableAndContent: {
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'row'
    },
    Lable: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey'
    },
    Content: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    Price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EF506B'
    },
    addButton: {
        padding: 10,
        backgroundColor: '#EF506B',
        margin: 10,
        borderRadius: 30
    },
    addText: {
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default AllCustomers;