import icon from '@/src/constants/icon';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    //color,
    label
}:{
    onPress: Function,
    onLongPress: Function, 
    isFocused: boolean, 
    routeName: string, 
    color: string, 
    label: string  
}) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, 
            {duration: 350}
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
        //1.2 pour augmenter taille icon lors animation

        const top = interpolate(scale.value, [0, 1], [0, 9]);
        //9 pour augmenter position icon lors animation

        return {
            transform: [{
                scale: scaleValue,
            }],
            top
        }
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])

        return {
            opacity
        }
    });

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
        >
            <Animated.View style={animatedIconStyle}>
                {icon[routeName]({
                    color: isFocused ? "#FFF" : "#222"
                })}
            </Animated.View>
            <Animated.Text style={[{ color: isFocused ? "#673ab7" : "#222", fontSize: 12 }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}
// Animated.Text permet de cacher le text lors du presse 
//Animated.View pour repositionner l'icon lors texte est caché 

const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})

export default TabBarButton;