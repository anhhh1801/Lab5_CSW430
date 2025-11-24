
import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>TRANSACTION DETAIL</Text>
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
                    ))};
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
                    <Text style={styles.PriceContent}> - {formatMoney(transaction.price)}</Text>
                </View>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 45,
    },
    header: {
        backgroundColor: '#EF506B',
        flexDirection: 'row',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        padding: 10
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