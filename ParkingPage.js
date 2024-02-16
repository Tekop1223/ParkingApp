import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ParkingPage = () => {
    const [leftSensorDistance, setLeftSensorDistance] = useState('');
    const [rightSensorDistance, setRightSensorDistance] = useState('');
    const isRepeating = useRef(true);

    useEffect(() => {
        const getDistance = () => {
            axios.get('http://192.168.0.115:3000/api/distance?deviceId=TAYLOR')
                .then(response => {
                    console.log(response.data.data);
                    setLeftSensorDistance(response.data.data.leftSensor);
                    setRightSensorDistance(response.data.data.rightSensor);
                })
                .catch(error => {
                    console.error('Distance error:', error);
                });

        };

        getDistance();

        const repeat = async () => {
            while (true) {
                if (isRepeating.current === true) {
                    console.log('repeating');
                    getDistance();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    break;
                }

            }

        };

        repeat();
        console.log("Reran setEffect")
    }, []);




    return (
        <View style={styles.container}>
            <View style={styles.sensorContainer}>
                <Text style={styles.topLeftText}>{leftSensorDistance}</Text>
                <Text style={styles.topRightText}>{rightSensorDistance}</Text>
            </View>
            <View>
                <Button
                    color={'red'}
                    title="stop"
                    onPress={() => { isRepeating.current = false; }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },

    sensorContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    topLeftText: {
        color: 'black',
        marginLeft: 10,
    },
    topRightText: {
        color: 'black',
        marginRight: 10,
    },
});

export default ParkingPage;
