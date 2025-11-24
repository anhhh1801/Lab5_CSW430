import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { addService } from '../../api/Api';
import { getToken } from '../../data/Store';

const AddServiceScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddService = async () => {
        if (!name || !price) {
            Alert.alert('Error', 'Please enter service name and price');
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();
            await addService(name, parseFloat(price), token);
            Alert.alert('Success', 'Service added successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add service');
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
                    <Text style={styles.headerText}>Add New Service</Text>
                </View>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Service Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleAddService}
                disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'Adding...' : 'Add Service'}
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

export default AddServiceScreen;