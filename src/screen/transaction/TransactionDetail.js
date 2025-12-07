
import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider } from "react-native-popup-menu";
import { CancelTransaction } from "../../api/Api";

const TransactionDetail = ({ route, navigation }) => {
    const { transaction } = route.params;

    const discount = transaction.priceBeforePromotion - transaction.price;

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const formatMoney = (money) => {
        return money.toLocaleString("vi-VN") + " đ";
    }

    const handleCancel = async () => {
        Alert.alert(
            "Confirm Cancel",
            "Are you sure you want to cancel this transaction?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await getToken();
                            await CancelTransaction(transaction._id, token);
                            Alert.alert("Canceled", "Transaction canceled successfully!");
                            navigation.goBack();
                        } catch (error) {
                            console.log("Cancel failed", error);
                            Alert.alert("Error", "cancel failed.");
                        }
                    }
                }
            ]
        );
    }

    return (
        <MenuProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>TRANSACTION DETAIL</Text>

                    <Menu>
                        <MenuTrigger>
                            <Text style={styles.menuButtonText}>⋮</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={handleCancel}>
                                <Text style={styles.menuOption}>Cancel</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>

                <View style={styles.Card}>
                    <Text style={styles.CardHeader}>General Information</Text>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.GeneralLabel}>Transaction code</Text>
                        <Text style={styles.GeneralContent}>{transaction.id}</Text>
                    </View>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.GeneralLabel}>Customer</Text>
                        <Text style={styles.GeneralContent}>{transaction.customer.name} - {transaction.customer.phone}</Text>
                    </View>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.GeneralLabel}>Creation time</Text>
                        <Text style={styles.GeneralContent}>{formatDate(transaction.createdAt)}</Text>
                    </View>
                </View>

                <View style={styles.Card}>
                    <Text style={styles.CardHeader}>Service List</Text>
                    <View>
                        {transaction.services.map((s) => (
                            <View style={styles.LabelAndContent}>
                                <Text style={styles.ServiceLabel}>{s.name}</Text>
                                <Text style={styles.ServiceQuantity}>x{s.quantity}</Text>
                                <Text style={styles.ServicePrice}>{formatMoney(s.price)}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.GeneralLabel}>Total</Text>
                        <Text style={styles.GeneralContent}>{formatMoney(transaction.priceBeforePromotion)}</Text>
                    </View>
                </View>

                <View style={styles.Card}>
                    <Text style={styles.CardHeader}>Cost</Text>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.GeneralLabel}>Amount of money</Text>
                        <Text style={styles.GeneralContent}>{formatMoney(transaction.priceBeforePromotion)}</Text>
                    </View>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.GeneralLabel}>Discount</Text>
                        <Text style={styles.GeneralContent}> - {formatMoney(discount)}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.LabelAndContent}>
                        <Text style={styles.PriceLabel}>Total payment</Text>
                        <Text style={styles.PriceContent}>{formatMoney(transaction.price)}</Text>
                    </View>
                </View>
            </View >
        </MenuProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 45,
    },
    header: {
        backgroundColor: '#EF506B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        padding: 10
    },
    menuButtonText: {
        fontSize: 25,
        color: '#fff'
    },
    menuOption: {
        padding: 10,
        fontSize: 16,
        paddingTop: 40
    },
    backButton: {
        fontWeight: 'bold',
        backgroundColor: '#fff',
        color: '#EF506B',
        margin: 10,
        marginLeft: 20,
        padding: 8,
        borderRadius: 10,
        fontSize: 15,
    },
    line: {
        borderWidth: 0.2,
        marginTop: 15,
        marginBottom: 15,
    },
    Card: {
        margin: 10,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    CardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EF506B',
    },
    LabelAndContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    GeneralLabel: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
        color: 'grey'
    },
    GeneralContent: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ServiceLabel: {
        fontSize: 16,
        marginTop: 5
    },
    ServicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ServiceQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey'
    },
    PriceLabel: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    PriceContent: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EF506B'
    }
});



export default TransactionDetail;