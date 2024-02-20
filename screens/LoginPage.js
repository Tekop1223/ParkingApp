import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://192.168.0.115:3000/api/login', {
            username: username,
            password: password,
        })
            .then(response => {
                if (response.data.code === 'USER_NOT_FOUND') {
                    console.log(response.data.message);
                    Alert.alert('Error', 'User not found');
                    return;
                }
                console.log(response.data);
                console.log("Username:", username)
                navigation.navigate('Parking');
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };


    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="black" onChangeText={setUsername} value={username} />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="black" secureTextEntry={true} onChangeText={setPassword} value={password} />
                <Button color={'red'}
                    title="Login"
                    onPress={handleLogin}
                />
            </View>

            <View style={styles.registerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterUser')}>
                    <Text style={styles.registerText}>
                        New user? Register here!
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
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    registerContainer: {
        marginBottom: 10,
        alignItems: 'center',
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
        marginBottom: 10,
        color: 'black',
        borderColor: 'black',
        placeholderTextColor: 'black',
    },
    registerText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    backText: {
        color: 'black'
    }
});

export default LoginPage;
