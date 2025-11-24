import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { getAllServices } from '../../api/Api';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadServices = async () => {
        try {
            const data = await getAllServices();
            setServices(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadServices();
        }, [])
    );

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
            <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.servicePrice}>{item.price} đ</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>VIET ANH</Text>
            </View>
            <Image
                source={require('../../image/logo_rtg.png')}
                style={styles.imageLogo}
            />
            <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>Danh sách dịch vụ</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Add')}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={services}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
                refreshing={loading}
                onRefresh={loadServices}
            />


        </View>
    );
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
    imageLogo: {
        width: '100%',
        marginTop: 5,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 30
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 3,
        alignItems: 'center',
        padding: 20
    },
    listHeaderText: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 200,
        height: 25,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#EF506B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
    },
    listContainer: {
        padding: 15,
    },
    serviceCard: {
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
    serviceInfo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 18,
        color: '#000000ff',
        marginRight: 5,
    },

});

export default HomeScreen;