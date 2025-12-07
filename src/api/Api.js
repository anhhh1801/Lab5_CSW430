import axios from 'axios';

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


//SERVICE
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


//CUSTOMER
//Get all customers
export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/customers`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Add a customer
export const addACustomer = async (name, phone, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/customers`,
            { name, phone },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("Add customer error:", error?.response?.data || error);
        throw error;
    }
}

//Delete a customer
export const deleteACustomer = async (id, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Get customer detail
export const getCustomerDetail = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/customers/${id}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}



//TRANSACTION
//Get all transactions
export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/transactions`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Get a transaction
export const getATransaction = async (_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/transactions/${_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

//Edit customer
export const updateCustomer = async (id, name, phone, token) => {
    try {
        const response = await axios.put(`${BASE_URL}/customers/${id}`, { name, phone },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response;
    } catch (error) {
        throw error
    }
}

export const addTransaction = async (transactionData, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post(`${BASE_URL}/transactions`, transactionData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Delete (Cancel) transaction 
export const CancelTransaction = async (id, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/transactions/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response;
    } catch (error) {
        throw error;
    }
}
