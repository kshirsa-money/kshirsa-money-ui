import { View, Platform, StyleSheet, Pressable } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import Colors from '../styles/Colors';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import uiRoutes from '../constants/uiRoutes';
import { usePathname, useRouter } from 'expo-router';
import KshirsaFloatingBtn from './KshirsaFloatingBtn';
import KshirsaUserAnimation from '../../assets/animatedImage/KshirsaUserAnimation';
import KshirsaHomeAnimation from '../../assets/animatedImage/KshirsaHomeAnimated';
export default function KshirsaTabbar({ state, descriptors, navigation }) {
    const pathname = usePathname();
    const visibleFloatingBtn = pathname === uiRoutes.main;
    const router = useRouter();
    const { buildHref } = useLinkBuilder();
    const [dimensions, setDimensions] = useState({ height: 20, width: 300 })
    const buttonWidth = dimensions.width / state.routes.length
    const tabPositionX = useSharedValue(0)
    const animatedTabPositionStyle = useAnimatedStyle(() => {
        // const offset = (buttonWidth - (buttonWidth - 100)) / 2
        return {
            transform: [{ translateX: tabPositionX.value }]
        }
    })
    const onTabbarLayout = (event) => {
        const { width, height } = event.nativeEvent.layout
        setDimensions({ width, height })
    }

    const icon = {
        HomeScreen: {
            unfocused: (props) => <AntDesign name="home" size={24} color={props.color} />,
            focused: (props) => <KshirsaHomeAnimation />,
        },
        profileScreen: {
            unfocused: (props) => <EvilIcons name="user" size={30} color={props.color} />,
            focused: (props) => <KshirsaUserAnimation />,
        },
    };
    return (
        <View style={KshirsaTabbarStyles.container} onLayout={onTabbarLayout}>
            {/* <Animated.View style={[animatedTabPositionStyle, {
                position: 'absolute',
                backgroundColor: Colors.primary,
                marginHorizontal: 5,
                width: buttonWidth - 40,
                borderRadius: 50,
                flexDirection: 'row',
                height: dimensions.height - 10,
            // }]} /> */}
            {visibleFloatingBtn &&
            <KshirsaFloatingBtn
               buttonStyles={KshirsaTabbarStyles.floatingButton}
             onPress={() => router.push(uiRoutes.addTransaction)}
             />}
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const scale = useSharedValue(0)
                useEffect(() => {
                    scale.value = withSpring(isFocused ? 1 : 0,
                        {
                            duration: 350,
                        }
                    )
                }, [scale, isFocused])

                const animatedTextStyle = useAnimatedStyle(() => {
                    const opacity = interpolate(scale.value, [0, 1], [1, 0])
                    return {
                        opacity,
                    }
                })
                const animatedIconStyle = useAnimatedStyle(() => {
                    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5])
                    const topValue = interpolate(scale.value, [0, 1], [0, 9])
                    return {
                        transform: [{ scale: scaleValue }],
                        top: topValue,
                    }
                })
                const onPress = () => {
                    tabPositionX.value = withSpring((buttonWidth) * index, {
                        duration: 1500,
                    })
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
                    <Pressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[KshirsaTabbarStyles.tabbarItem]}
                        key={route.key}
                    >
                        <Animated.View style={[animatedIconStyle]}>
                            {icon[route.name] && icon[route.name][isFocused ? 'focused' : 'unfocused']({
                                focused: isFocused,
                                color: isFocused ? Colors.primary : Colors.primaryText,
                            })}
                        </Animated.View>
                        <Animated.Text style={[{ color: isFocused ? Colors.white : Colors.primaryText }, animatedTextStyle]}>
                            {label}
                        </Animated.Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const KshirsaTabbarStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.moodyBlack,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        marginHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 80,
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 50,
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        borderRadius: 100,
        paddingVertical: 10,
        height: 60,
        width: 60,
        // borderWidth: 1,
        // borderColor: Colors.lightGrey,
        width: 20,
    },
    tabbarItemFocused: {
        backgroundColor: Colors.secondary,
        // top: -10,
    },
    floatingButton: {
        position: 'absolute',
        top: -30, // Adjust this value to position the button above the tab bar
        left: '50%',
        transform: [{ translateX: -25 }], // Center the button horizontally
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
