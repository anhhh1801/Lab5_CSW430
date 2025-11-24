import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { login } from '../../api/Api';
import { saveToken } from '../../data/Store';

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!phone || !password) {
            Alert.alert('Error', 'Please enter phone and password');
            return;
        }

        setLoading(true);
        try {
            const response = await login(phone, password);
            await saveToken(response.token);
            navigation.replace('MainTabs');
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid phone or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'Login'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#EF506B',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#EF506B',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;