import React, { useEffect, useState } from 'react';
import { Keyboard, LayoutChangeEvent, StyleSheet, View } from 'react-native';
//import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import TabBarButton from '@/src/components/TabBar/TabBarButton';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
//import { transform } from '@babel/core';

export default function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  //const { colors } = useTheme();
  //const { buildHref } = useLinkBuilder(); 

  const [dimensions, setDimension] = useState(
    { //Valeurs initiales
        height: 20,
        width: 100
    });
  
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e:LayoutChangeEvent) => {
    setDimension({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
        transform: [{
            translateX: tabPositionX.value
        }]
  }});

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [tabBarStyle, setTabBarStyle] = useState({});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        setTabBarStyle({ display: 'none'});
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setTabBarStyle({});
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  

  return (
    <View onLayout={onTabbarLayout} style={[styles.tabbar, tabBarStyle]}>
      <Animated.View style={[animatedStyle, {
        position: 'absolute',
        backgroundColor: '#723FEB',
        borderRadius: 30,
        marginHorizontal: 12, 
        height: dimensions.height - 15,
        width: buttonWidth - 25,
      }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500});
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton 
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={ isFocused ? "#FFF" : "#222"}
                label={label}
            />
        );
      })}
    </View>
  );
}  

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 80,
        paddingVertical: 15, 
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    }, 
});