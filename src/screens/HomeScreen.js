import React, { useContext, useState, useEffect } from "react";
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import BannerSlider from "../components/BannerSlider";
import CustomSwitch from "../components/CustomSwitch";
import ListItem from "../components/ListItem";

import { View, Text, Button, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity, Alert, Linking } from "react-native";
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
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/news`);
                // Extraer correctamente la lista de noticias
                setNews(response.data.data || []);
            } catch (error) {
                console.error("Error al obtener noticias:", error);
            } finally {
                setLoadingNews(false);
            }
        };
        fetchNews();
    }, []);

    const validateUrl = async () => {
        if (!url) {
            Alert.alert('Error', 'Por favor ingresa una URL');
            return;
        }

        try {
            const email = userInfo.user.email;
            const user_id = userInfo.user.user_id;
            const response = await axios.post(`${BASE_URL}/validate_url`, { url, email, user_id });

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
            const { domain, ip, phishingMessage, reputationResult } = analysisResult;
    
            const phishingDetails = phishingMessage
                ? `Detectado: ${phishingMessage.detected ? 'Sí' : 'No'}\nMensaje: ${phishingMessage.message}\nNivel de Riesgo: ${phishingMessage.risk_level}`
                : "No hay información de phishing.";
    
            const response = await axios.post(`${BASE_URL}/send-email`, {
                subject: 'Reporte de Análisis de Phishing',
                body: `Dominio: ${domain}\nIP: ${ip}\n${phishingDetails}\nReputación: ${reputationResult}`,
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

    const handleOpenURL = (url) => {
        Alert.alert(
            "Salir de la aplicación",
            "Estás a punto de abrir un enlace externo. ¿Quieres continuar?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Abrir", onPress: () => Linking.openURL(url) }
            ]
        );
    };

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
                        <View>
                            <Text style={styles.resultText}>🔍 Análisis de URL</Text>

                            <Text style={styles.resultText}>🌐 Dominio: {analysisResult?.domain || 'No disponible'}</Text>
                            <Text style={styles.resultText}>📌 IP: {analysisResult?.ip || 'No disponible'}</Text>

                            <Text style={styles.resultText}>⚠️ Mensaje de Phishing:</Text>
                            <Text style={styles.resultText}>   - Detectado: {analysisResult?.phishingMessage?.detected ? 'Sí' : 'No'}</Text>
                            <Text style={styles.resultText}>   - Mensaje: {analysisResult?.phishingMessage?.message || 'No disponible'}</Text>
                            <Text style={styles.resultText}>   - Nivel de Riesgo: {analysisResult?.phishingMessage?.risk_level || 'No disponible'}</Text>

                            <Text style={styles.resultText}> {analysisResult?.reputationResult || 'No disponible'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
                            <TouchableOpacity style={styles.analyzeButton} onPress={sendEmail}>
                                <Text style={styles.buttonText}>Enviar Correo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.analyzeButton} onPress={handleClear}>
                                <Text style={styles.buttonText}>Cerrar Reporte</Text>
                            </TouchableOpacity>
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
                        option1={'Noticias'}
                        option2={'Más Noticas'}
                        onSelectSwitch={onSelectSwitch}
                    />
                </View>

                <View style={styles.tabs}>
                    {tab == 1 && news.slice(0, Math.ceil(news.length / 2)).map(item => (
                        <ListItem
                            key={item.url} 
                            photo={item.url_to_image}
                            title={item.title}
                            subtitle={item.description}
                            onPress={() => handleOpenURL(item.url)}
                        />
                    ))}

                    {tab == 2 && news.slice(Math.ceil(news.length / 2)).map(item => (
                        <ListItem
                            key={item.url}
                            photo={item.url_to_image}
                            title={item.title}
                            subtitle={item.description}
                            onPress={() => handleOpenURL(item.url)}
                        />
                    ))}
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10@vs'
    },
});

export default HomeScreen;
