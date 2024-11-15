import React, { useContext, useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import BannerSlider from "../components/BannerSlider";
import CustomSwitch from "../components/CustomSwitch";
import ListItem from "../components/ListItem";

import { View, Text, Button, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { freeGames, paidGames, sliderData } from "../model/data";
import { widthHeigth, windowWidth } from "../utils/Dimensions";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../config";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
    const [url, setUrl] = useState("");
    const [tab, setTap] = useState('1')
    const [analysisResult, setAnalysisResult] = useState(null);
    const { userInfo, isLoading } = useContext(AuthContext);
    
    const validateUrl = async () => {
        if (!url) {
            Alert.alert('Error', 'Por favor ingresa una URL');
            return;
        }
        
        try {
            const email = userInfo.user.email;
            const response = await axios.post(`${BASE_URL}/validate_url`, { url, email });
            console.log("response: ", response)
            // Extraemos los datos relevantes de la respuesta
            const { domain, ip, phishing_message, reputation_result } = response.data;

            // Actualizamos el estado con los resultados del análisis
            setAnalysisResult({
                domain,
                ip,
                phishingMessage: phishing_message,
                reputationResult: reputation_result,
            });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Algo salió mal. Intenta nuevamente.');
        }
    };

    const sendEmail = async () => {
        try {
            const email = userInfo.user.email;
            const response = await axios.post(`${BASE_URL}/send-email`, {
                subject: 'Reporte de Análisis de Phishing',
                body: `Dominio: ${analysisResult.domain}\nIP: ${analysisResult.ip}\nMensaje de Phishing: ${analysisResult.phishingMessage}\nReputación: ${analysisResult.reputationResult}`,
                recipient_email: email,
            });

            if (response.status === 200) {
                Alert.alert("Éxito", "Correo enviado correctamente");
            } else {
                Alert.alert("Error", "No se pudo enviar el correo");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Hubo un problema al enviar el correo");
        }
    };

    const handleClear = () => {
        setAnalysisResult(null);
        setUrl("");
    };

    // Esperamos que userInfo esté disponible
    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#018b8b" />
            </SafeAreaView>
        );
    }

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
                    <Text style={styles.title}>
                        {userInfo && userInfo.user && userInfo.user.username
                            ? `Hola ${userInfo.user.username}`
                            : 'Hola, Usuario'}
                    </Text>
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
                    <TextInput
                        placeholder="URL"
                        placeholderTextColor={'#000'}
                        style={styles.url}
                        value={url}
                        onChangeText={setUrl} // Actualiza el estado cuando cambia el texto
                    />
                    <TouchableOpacity style={styles.analyzeButton} onPress={validateUrl}>
                        <Text style={styles.buttonText}>Analizar</Text>
                    </TouchableOpacity>
                </View>

                {/* Mostrar resultados del análisis si existen */}
                {analysisResult && (
                    <View style={styles.analysisResult}>
                        <Text style={styles.resultText}>Dominio: {analysisResult.domain}</Text>
                        <Text style={styles.resultText}>IP: {analysisResult.ip}</Text>
                        <Text style={styles.resultText}>Mensaje de Phishing: {analysisResult.phishingMessage}</Text>
                        <Text style={styles.resultText}>Reputación: {analysisResult.reputationResult}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Enviar Correo" onPress={sendEmail} />
                            <Button title="Cerrar Reporte" onPress={handleClear} />
                        </View>
                    </View>
                )}

                <View style={styles.titleSection}>
                    {/* <Text style={styles.title}>Obtenga más información sobre el phishing</Text> */}
                    {/* <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.span}>See all</Text>
                    </TouchableOpacity> */}
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
                                onPress={() =>
                                    navigation.navigate('DetailsScreen', {
                                        title: item.title,
                                        id: item.id
                                    })
                                }
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
                                onPress={() =>
                                    navigation.navigate('DetailsScreen', {
                                        title: item.title,
                                        id: item.id
                                    })
                                }
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
        marginBottom: '10@vs'
    },
    title: {
        fontSize: '15@vs',
        fontFamily: 'Roboto-Medium',
        color: '#000'
    },
    imageBackground: {
        width: '40@s',
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
        color: '#000',
        width: '70%'
    },
    analyzeButton: {
        backgroundColor: '#018b8b',
        paddingVertical: '5@vs',
        paddingHorizontal: '10@s',
        borderRadius: 5,
        marginLeft: 'auto'
    },
    buttonText: {
        color: '#FFF',
        fontSize: '12@vs'
    },
    titleSection: {
        marginVertical: '5@vs',
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
    },
    resultContainer: {
        marginTop: '10@vs',
        padding: '10@s',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#C6C6C6',
        backgroundColor: '#f8f8f8'
    },
    resultText: {
        color: '#000',
        fontSize: '14@vs'
    }
});

export default HomeScreen;
