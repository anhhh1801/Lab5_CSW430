import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { removeToken } from '../../data/Store';

const LogoutScreen = ({ navigation }) => {

    const handleLogout = async () => {
        await removeToken();
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SETTING</Text>
            </View>

            <View style={styles.listHeader}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
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
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 30
    },
    logoutButton: {
        width: '90%',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EF506B',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    logoutButtonText: {
        fontSize: 30,
        color: '#fff',
    },
});

export default LogoutScreen;