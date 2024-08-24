import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const Sidebar = ({ visible, onClose }) => {
    const [feedback, setFeedback] = React.useState('');

    const handleSubmit = () => {
        // Handle feedback submission here
        console.log('Feedback submitted:', feedback);
        setFeedback('');
        onClose(); // Close the sidebar after submission
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <View style={styles.sidebar}>
                    <Text style={styles.title}>Feedback</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your feedback here..."
                        multiline
                        value={feedback}
                        onChangeText={setFeedback}
                    />
                    <Button title="Submit Feedback" onPress={handleSubmit} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    sidebar: {
        width: 300,
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        height: '100%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        textAlignVertical: 'top',
    },
});

export default Sidebar;
