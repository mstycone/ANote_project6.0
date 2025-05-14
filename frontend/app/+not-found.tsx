import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
          <Stack.Screen options={{ title: 'Oops! Page Introuvable'}}/>
          <View style={styles.container}>
            <Link href="/" style={styles.button}>
                Veuillez retourner vers la page d&aposaccueil!
            </Link>
          </View>
        </>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',      
    }
})