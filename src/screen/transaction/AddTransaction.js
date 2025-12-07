import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    ScrollView,
    Modal,
    ActivityIndicator
} from 'react-native';
import { getAllServices, getAllCustomers, addTransaction } from '../../api/Api';
import { getToken } from '../../data/Store';

const AddTransaction = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedServices, setSelectedServices] = useState({});
    // Structure: { serviceId: { quantity: 1, userId: 'executor_id' } }

    // State cho Modal (Dropdown giả lập)
    const [customerModalVisible, setCustomerModalVisible] = useState(false);

    // Mock danh sách Executor (Vì API không cung cấp endpoint lấy danh sách nhân viên, dùng tạm user hiện tại hoặc list mẫu)
    const EXECUTORS = [
        { id: 'user1', name: 'Hào' },
        { id: 'user2', name: 'Thảo' },
        { id: 'user3', name: 'Huyền' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, customersData] = await Promise.all([
                    getAllServices(),
                    getAllCustomers()
                ]);
                setServices(servicesData);
                setCustomers(customersData);
            } catch (error) {
                Alert.alert("Error", "Could not fetch data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleService = (service) => {
        setSelectedServices(prev => {
            const newState = { ...prev };
            if (newState[service._id]) {
                delete newState[service._id];
            } else {
                newState[service._id] = {
                    quantity: 1,
                    userId: EXECUTORS[0].id,
                    price: service.price
                };
            }
            return newState;
        });
    };

    const updateQuantity = (serviceId, delta) => {
        setSelectedServices(prev => {
            const currentItem = prev[serviceId];
            if (!currentItem) return prev;

            const newQuantity = currentItem.quantity + delta;
            if (newQuantity < 1) return prev; // Không giảm dưới 1

            return {
                ...prev,
                [serviceId]: { ...currentItem, quantity: newQuantity }
            };
        });
    };

    const totalPrice = useMemo(() => {
        let total = 0;
        Object.values(selectedServices).forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }, [selectedServices]);

    const handleAddTransaction = async () => {
        if (!selectedCustomer) {
            Alert.alert("Missing Info", "Please select a customer.");
            return;
        }
        if (Object.keys(selectedServices).length === 0) {
            Alert.alert("Missing Info", "Please select at least one service.");
            return;
        }

        try {
            const token = await getToken();

            const servicesPayload = Object.keys(selectedServices).map(serviceId => ({
                _id: serviceId,
                quantity: selectedServices[serviceId].quantity,
                userId: selectedServices[serviceId].userId // Executor ID
            }));

            const payload = {
                customerId: selectedCustomer._id,
                services: servicesPayload
            };

            await addTransaction(payload, token);
            Alert.alert("Success", "Transaction added successfully!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to add transaction. " + error.message);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderServiceItem = (service) => {
        const isSelected = !!selectedServices[service._id];
        const itemData = selectedServices[service._id];

        return (
            <View key={service._id} style={styles.serviceItemContainer}>
                <TouchableOpacity
                    style={styles.serviceHeader}
                    onPress={() => toggleService(service)}
                >
                    <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                        {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>

                {isSelected && (
                    <View style={styles.serviceDetails}>
                        <View style={styles.controlsRow}>
                            <View style={styles.quantityControl}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => updateQuantity(service._id, -1)}
                                >
                                    <Text style={styles.qtyText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyValue}>{itemData.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => updateQuantity(service._id, 1)}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.executorBox}>
                                <Text style={styles.executorText}>Executor: {EXECUTORS[0].name}</Text>
                            </View>
                        </View>

                        <Text style={styles.priceText}>
                            Price: {formatCurrency(service.price * itemData.quantity)}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add transaction</Text>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#EF506B" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView style={styles.content}>
                    {/* Customer Dropdown Trigger */}
                    <Text style={styles.sectionLabel}>Customer *</Text>
                    <TouchableOpacity
                        style={styles.dropdownBox}
                        onPress={() => setCustomerModalVisible(true)}
                    >
                        <Text style={styles.dropdownText}>
                            {selectedCustomer ? selectedCustomer.name : "Select customer"}
                        </Text>
                        <Text style={styles.dropdownIcon}>▼</Text>
                    </TouchableOpacity>

                    {/* Services List */}
                    <View style={styles.serviceList}>
                        {services.map(renderServiceItem)}
                    </View>
                </ScrollView>
            )}

            {/* Footer Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.summaryButton} onPress={handleAddTransaction}>
                    <Text style={styles.summaryButtonText}>
                        See summary: ({formatCurrency(totalPrice)})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Customer Selection Modal */}
            <Modal
                visible={customerModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Customer</Text>
                        <FlatList
                            data={customers}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setSelectedCustomer(item);
                                        setCustomerModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>{item.name} - {item.phone}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setCustomerModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 80,
        backgroundColor: '#EF506B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 30, // For Status bar
    },
    backButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    dropdownBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    dropdownIcon: {
        fontSize: 12,
        color: '#666',
    },
    serviceList: {
        marginBottom: 20,
    },
    serviceItemContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
    },
    serviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#EF506B', // Màu cam/hồng nhạt khi chưa check
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#fff'
    },
    checkboxChecked: {
        backgroundColor: '#EF506B',
    },
    checkmark: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    serviceName: {
        fontSize: 16,
        color: '#555',
    },
    serviceDetails: {
        marginTop: 10,
        paddingLeft: 34, // Align with text inside checkbox
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    qtyBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    qtyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    qtyValue: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    executorBox: {
        flex: 1,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    executorText: {
        color: '#777',
        fontSize: 14,
    },
    priceText: {
        color: '#EF506B',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        marginTop: 5,
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    summaryButton: {
        backgroundColor: '#EF506B',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    summaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalItemText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 15,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    closeButtonText: {
        fontWeight: 'bold',
    },
});

export default AddTransaction;