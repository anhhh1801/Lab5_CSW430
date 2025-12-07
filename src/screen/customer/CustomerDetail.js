import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getCustomerDetail, deleteACustomer } from "../../api/Api";
import { getToken } from "../../data/Store";
import { Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider } from "react-native-popup-menu";

const CustomerDetail = ({ route, navigation }) => {
    const { customer } = route.params;
    const [customerDetail, setCustomerDetail] = useState({ transactions: [] });

    const loadCustomerDetail = async () => {
        try {
            const response = await getCustomerDetail(customer._id);
            setCustomerDetail(response);
        } catch (error) {
            throw (error)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadCustomerDetail();
        });

        return unsubscribe;
    }, [navigation]);
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

    const handleDelete = async () => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this customer?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await getToken();
                            await deleteACustomer(customer._id, token);
                            Alert.alert("Deleted", "Customer removed successfully!");
                            navigation.goBack();
                        } catch (error) {
                            console.log("Delete failed", error);
                            Alert.alert("Error", "Delete failed.");
                        }
                    }
                }
            ]
        );
    };


    return (
        <MenuProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>CUSTOMER DETAIL</Text>

                    <Menu>
                        <MenuTrigger>
                            <Text style={styles.menuButtonText}>⋮</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption
                                onSelect={() =>
                                    navigation.navigate('EditCustomer', { customer })
                                }>
                                <Text style={styles.menuOption}>Edit</Text>
                            </MenuOption>
                            <MenuOption onSelect={handleDelete}>
                                <Text style={[styles.menuOption, styles.deleteOption]}>
                                    Delete
                                </Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>

                <View style={styles.Card}>
                    <Text style={styles.CardHeader}>General Information</Text>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Name: </Text>
                        <Text style={styles.Content}>{customer.name}</Text>
                    </View>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Phone: </Text>
                        <Text style={styles.Content}>{customer.phone}</Text>
                    </View>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Total spent: </Text>
                        <Text style={styles.Content}>{customer.totalSpent}</Text>
                    </View>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Time: </Text>
                        <Text style={styles.Content}></Text>
                    </View>
                    <View style={styles.LableAndContent}>
                        <Text style={styles.Lable}>Last update: </Text>
                        <Text style={styles.Content}></Text>
                    </View>
                </View>

                <View style={styles.Card}>
                    <Text style={styles.CardHeader}>Transactions</Text>

                    {customerDetail.transactions.map((t) => (
                        <View key={t._id} style={styles.transactionCard}>
                            <Text style={styles.TransactionHeader}>{t.id} - {formatDate(t.createdAt)} {isCanceled(t.status)} </Text>

                            <View style={styles.serviceAndPrice}>
                                <View>
                                    {t.services.map((s) => (
                                        <Text style={styles.serviceItem}>- {s.name}</Text>
                                    ))}
                                </View>
                                <Text style={styles.Price}>{formatMoney(t.price)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </MenuProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 45,

    },
    header: {
        backgroundColor: '#EF506B',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backButton: {
        padding: 8,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    backButtonText: {
        color: '#EF506B',
        fontWeight: 'bold'
    },
    menuButtonText: {
        fontSize: 25,
        color: '#fff'
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25
    },
    Card: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 20,
        padding: 20
    },
    CardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EF506B',
        marginBottom: 20
    },
    LableAndContent: {
        flexDirection: 'row'
    },
    Lable: {
        fontWeight: 'bold',
        fontSize: 18
    },
    Content: {
        fontSize: 18
    },
    transactionCard: {
        padding: 10,
        borderWidth: 0.5,
        marginBlock: 10,
        borderRadius: 20
    },
    TransactionHeader: {
        fontWeight: 'bold'
    },
    serviceAndPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    serviceItem: {
        fontSize: 16
    },
    Price: {
        fontWeight: 'bold',
        color: '#EF506B',
        fontSize: 16
    },
    menuOption: {
        padding: 10,
        fontSize: 16,
        paddingTop: 40
    },
    deleteOption: {
        color: 'red',
    },
});

export default CustomerDetail;