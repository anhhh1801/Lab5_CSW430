import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
import { deleteService } from '../api/Api';
import { getToken } from '../data/Store';

const ServiceDetailScreen = ({ route, navigation }) => {
    const { service } = route.params;

    const handleDelete = async () => {
        Alert.alert(
            'Delete Service',
            'Are you sure you want to delete this service?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await getToken();
                            await deleteService(service._id, token);
                            Alert.alert('Success', 'Service deleted successfully');
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete service');
                        }
                    },
                },
            ]
        );
    };

    return (
        <MenuProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.backButton}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Service Detail</Text>
                    </View>
                    <Menu>
                        <MenuTrigger>
                            <Text style={styles.menuButton}>⋮</Text>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption
                                onSelect={() =>
                                    navigation.navigate('Edit', { service })
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

                <View style={styles.detailsContainer}>
                    <View style={styles.textContain}>
                        <Text style={styles.serviceTitle}>Service Name: </Text>
                        <Text style={styles.serviceContent}>{service.name}</Text>
                    </View>
                    <View style={styles.textContain}>
                        <Text style={styles.serviceTitle}>Price: </Text>
                        <Text style={styles.serviceContent}>{service.price}</Text>
                    </View>
                    <View style={styles.textContain}>
                        <Text style={styles.serviceTitle}>Time: </Text>
                        <Text style={styles.serviceContent}>{service.createdAt}</Text>
                    </View>
                    <View style={styles.textContain}>
                        <Text style={styles.serviceTitle}>Final update: </Text>
                        <Text style={styles.serviceContent}>{service.updatedAt}</Text>
                    </View>
                </View>
            </View>
        </MenuProvider>
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
        backgroundColor: '#EF506B'
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
    menuButton: {
        fontSize: 24,
        color: '#333',
        paddingTop: 40
    },
    menuOption: {
        padding: 10,
        fontSize: 16,
        paddingTop: 40
    },
    deleteOption: {
        color: 'red',
    },
    detailsContainer: {
        padding: 20,
    },
    textContain: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    serviceTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    serviceContent: {
        fontSize: 20,
    },
});

export default ServiceDetailScreen;