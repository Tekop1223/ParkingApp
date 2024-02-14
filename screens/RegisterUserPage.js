import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RegisterUserPage = ({ navigation }) => {
    // State for user input
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // handle user registration
    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }


        axios.post('http://192.168.0.115:3000/api/register', {
            username: username,
            password: password,
        })
            .then(response => {
                console.log(response.data);
                console.log("Username:", username, " ", "Password:", password)
                navigation.navigate('Parking');
            })
            .catch(error => {
                console.error('Registration error:', error);
                Alert.alert('error', 'something went wrong, please try again later');
            });
    };

    return (
        <View style={styles.container} >
            <View style={styles.registerContainer}>
                <Text style={styles.text}>Register Page</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="black"
                    onChangeText={setUsername}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                <Button
                    color={'red'}
                    title="Register"
                    onPress={handleRegister}
                />
            </View>
            <View style={styles.loginContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>
                        Already registered? Login here!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    registerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        color: 'black',
        borderColor: 'black',
        placeholderTextColor: 'black',
        marginBottom: 10,
    },

    loginContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },

    loginText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default RegisterUserPage;
