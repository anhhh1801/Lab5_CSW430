import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { updateCustomer } from '../../api/Api';
import { getToken } from '../../data/Store';

const EditCustomer = ({ route, navigation }) => {
    const { customer } = route.params;
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    const [loading, setLoading] = useState(false);

    const handleUpdateCustomer = async () => {
        if (!name || !phone) {
            Alert.alert('Error', 'Please enter service name and price');
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();
            await updateCustomer(customer._id, name, phone, token);
            Alert.alert('Success', 'Customer updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update customer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Edit Customer</Text>
                </View>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Customer Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateCustomer}
                disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'Updating...' : 'Update Customer'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        backgroundColor: '#EF506B',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 40,
        marginLeft: 20
    },
    headerLeft: {
        flexDirection: 'row',
    },
    backButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EF506B',
        backgroundColor: '#fff',
        marginTop: 40,
        padding: 5,
        borderRadius: 10
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        margin: 20
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#EF506B',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    cancelButton: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditCustomer;