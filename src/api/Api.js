import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://kami-backend-5rs0.onrender.com';

// Login
export const login = async (phone, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, {
            phone,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get all services
export const getAllServices = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/services`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get a service by ID
export const getServiceById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/services/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add a service
export const addService = async (name, price, token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/services`,
            { name, price },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a service
export const updateService = async (id, name, price, token) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/services/${id}`,
            { name, price },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a service
export const deleteService = async (id, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/services/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};