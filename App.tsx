import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const question = 'What is the output of the following code? \nconsole.log(1 + "2" + "2");';
const options = ['122', '32', '14', 'NaN'];
const correctAnswer = '122';

const App = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const confettiAnim = useRef(new Animated.Value(0)).current;

    // Handle answer submission
    const handleSubmit = () => {
        if (selectedOption === correctAnswer) {
            setIsCorrect(true);
            triggerConfetti();
        }
        else {
            setIsCorrect(false);
            triggerShake();
        }
    };

    // Shake animation for incorrect answer
    const triggerShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -1,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Confetti animation for correct answer
    const triggerConfetti = () => {
        Animated.timing(confettiAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            <Animated.View
                style={[
                    styles.optionsContainer,
                    {
                        transform: [
                            {
                                translateX: shakeAnim.interpolate({
                                    inputRange: [-1, 1],
                                    outputRange: [-10, 10],
                                }),
                            },
                        ],

                    },
                ]}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedOption === option && styles.selectedOptionButton,
                        ]}
                        onPress={() => setSelectedOption(option)}>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>

            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            {isCorrect === false && (
                <Text style={styles.errorMessage}>Oops! That's not quite right. Try again!</Text>
            )}

            {isCorrect && (
                <Animated.View
                    style={[styles.congratsContainer,
                    { opacity: confettiAnim }]}>
                    <Text style={styles.congratsText}>Congratulations! You earned the JS Master badge!</Text>
                    <Text style={styles.badge}>x</Text>
                </Animated.View>
            )}

        </View>
    )
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    question: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    optionsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#EFEFEF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },

    selectedOptionButton: {
        backgroundColor: '#D1E7DD',
    },

    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    submitText: {
        color: '#FFF',
        fontSize: 16,
    },
    errorMessage: {
        color: '#FF0000',
        fontSize: 14,
        marginTop: 20,
    },
    congratsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    congratsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28A745',
    },
    badge: {
        fontSize: 50,
    }

})