import React from "react";
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import BannerSlider from "../components/BannerSlider";

import { View, Text, Button, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { sliderData } from "../model/data";
import { windowWidth } from "../utils/Dimensions";

const HomeScreen = () => {

    const renderBanner = ({item, index}) => {
        return (<BannerSlider data={item} index={index} />)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container_img}>
                    <Text style={styles.title}>Hello Oliver</Text>
                    <ImageBackground
                        source={require('../assets/images/user-profile.jpg')}
                        style={styles.imageBackground}
                        imageStyle={{ borderRadius: 30 }}
                    />
                </View>

                <View style={styles.containerInput}>
                    <Feather name="search" size={verticalScale(15)} color={"#C6C6C6C6"} style={styles.search} />
                    <TextInput placeholder="URL" style={styles.url} />
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
                    data={sliderData}
                    renderItem={renderBanner}
                    width={windowWidth - 60}
                    height={windowWidth / 2}
                />
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
        paddingVertical: '5@vs',
        alignItems: 'center'
    },
    search: {
        marginRight: '5@s'
    },
    url: {
        fontSize: '12@vs'
    },
    titleSection: {
        marginVertical: '10@vs',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    span: {
        color: '#008b8b',
        fontSize: '15@vs'
    }
});

export default HomeScreen;
