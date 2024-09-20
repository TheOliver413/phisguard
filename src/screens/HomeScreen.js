import React, { useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import BannerSlider from "../components/BannerSlider";
import CustomSwitch from "../components/CustomSwitch";
import ListItem from "../components/ListItem";

import { View, Text, Button, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { freeGames, paidGames, sliderData } from "../model/data";
import { widthHeigth, windowWidth } from "../utils/Dimensions";

const HomeScreen = ({ navigation }) => {

    const [tab, setTap] = useState('1')

    const renderBanner = ({ item, index }) => {
        return (<BannerSlider data={item} index={index} />)
    }

    const onSelectSwitch = (value) => {
        setTap(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container_img}>
                    <Text style={styles.title}>Hello Oliver</Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <ImageBackground
                            source={require('../assets/images/user-profile.jpg')}
                            style={styles.imageBackground}
                            imageStyle={{ borderRadius: 30 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerInput}>
                    <Feather name="search" size={verticalScale(15)} color={"#C6C6C6C6"} style={styles.search} />
                    <TextInput placeholder="URL" placeholderTextColor={'#000'} style={styles.url} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>Learn more about phishing</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.span}>See all</Text>
                    </TouchableOpacity>
                </View>

                <Carousel
                    loop
                    scrollAnimationDuration={1000}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    data={sliderData}
                    renderItem={renderBanner}
                    width={windowWidth - 60}
                    height={widthHeigth / 4}
                />

                <View style={styles.switch}>
                    <CustomSwitch
                        selectionMode={1}
                        option1={'Tap 1'}
                        option2={'Tap 2'}
                        onSelectSwitch={onSelectSwitch}
                    />
                </View>

                <View style={styles.tabs}>
                    {tab == 1 &&
                        freeGames.map(item => (
                            <ListItem
                                key={item.id}
                                photo={item.poster}
                                title={item.title}
                                subtitle={item.subtitle}
                                isFree={item.isFree}
                                price={item.price}
                            />
                        ))
                    }

                    {tab == 2 &&
                        paidGames.map(item => (
                            <ListItem
                                key={item.id}
                                photo={item.poster}
                                title={item.title}
                                subtitle={item.subtitle}
                                isFree={item.isFree}
                                price={item.price}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    scrollView: {
        padding: '20@vs'
    },
    container_img: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '15@vs'
    },
    title: {
        fontSize: '15@vs',
        fontFamily: 'Roboto-Medium',
        color: '#000'
    },
    imageBackground: {
        width: '30@s',
        height: '35@vs',
    },
    containerInput: {
        flexDirection: 'row',
        borderColor: '#C6C6C6C6',
        borderWidth: '1@s',
        borderRadius: 8,
        paddingHorizontal: '10@s',
        alignItems: 'center'
    },
    search: {
        marginRight: '5@s'
    },
    url: {
        fontSize: '12@vs',
        color: '#000'
    },
    titleSection: {
        marginVertical: '10@vs',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    span: {
        color: '#008b8b',
        fontSize: '15@vs'
    },
    switch: {
        marginVertical: '10@vs'
    },
    tabs: {
        marginBottom: '10@vs'
    }
});

export default HomeScreen;
