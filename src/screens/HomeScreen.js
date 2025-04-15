import React, { useContext, useState, useEffect } from "react";
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import BannerSlider from "../components/BannerSlider";
import CustomSwitch from "../components/CustomSwitch";
import ListItem from "../components/ListItem";

import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    ImageBackground, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Linking,
    useColorScheme,
    ActivityIndicator
} from "react-native";
import { scale, ScaledSheet, verticalScale } from "react-native-size-matters";
import { freeGames, paidGames, sliderData } from "../model/data";
import { widthHeigth, windowWidth } from "../utils/Dimensions";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../config";
import axios from "axios";

// Theme colors for light and dark mode
const theme = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        secondaryText: '#555555',
        inputBackground: '#FFFFFF',
        inputBorder: '#C6C6C6C6',
        primary: '#018b8b',
        cardBackground: '#FFFFFF',
        resultBackground: '#f8f8f8',
        resultBorder: '#C6C6C6',
        placeholderColor: '#999999',
        iconColor: '#C6C6C6C6',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        secondaryText: '#AAAAAA',
        inputBackground: '#2A2A2A',
        inputBorder: '#444444',
        primary: '#02BEBE',
        cardBackground: '#1E1E1E',
        resultBackground: '#2A2A2A',
        resultBorder: '#444444',
        placeholderColor: '#777777',
        iconColor: '#777777',
    }
};

const HomeScreen = ({ navigation }) => {
    const [url, setUrl] = useState("");
    const [tab, setTap] = useState('1')
    const [analysisResult, setAnalysisResult] = useState(null);
    const { userInfo, isLoading } = useContext(AuthContext);
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const colorScheme = useColorScheme();
    
    // Default to light if colorScheme is null
    const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

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
            <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
                <ActivityIndicator size="large" color={currentTheme.primary} />
            </SafeAreaView>
        );
    }

    const renderBanner = ({ item, index }) => {
        return (<BannerSlider data={item} index={index} theme={currentTheme} />)
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
        <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
            <ScrollView 
                style={[styles.scrollView, { backgroundColor: currentTheme.background }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container_img}>
                    <Text style={[styles.title, { color: currentTheme.text }]}>
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

                <View style={[
                    styles.containerInput, 
                    { 
                        backgroundColor: currentTheme.inputBackground,
                        borderColor: currentTheme.inputBorder 
                    }
                ]}>
                    <Feather 
                        name="search" 
                        size={verticalScale(15)} 
                        color={currentTheme.iconColor} 
                        style={styles.search} 
                    />
                    <TextInput
                        placeholder="URL"
                        placeholderTextColor={currentTheme.placeholderColor}
                        style={[styles.url, { color: currentTheme.text }]}
                        value={url}
                        onChangeText={setUrl}
                    />
                    <TouchableOpacity 
                        style={[styles.analyzeButton, { backgroundColor: currentTheme.primary }]} 
                        onPress={validateUrl}
                    >
                        <Text style={styles.buttonText}>Analizar</Text>
                    </TouchableOpacity>
                </View>

                {/* Mostrar resultados del análisis si existen */}
                {analysisResult && (
                    <View style={[
                        styles.analysisResult, 
                        { 
                            backgroundColor: currentTheme.resultBackground,
                            borderColor: currentTheme.resultBorder 
                        }
                    ]}>
                        <View>
                            <Text style={[styles.resultText, { color: currentTheme.text, fontWeight: 'bold' }]}>
                                🔍 Análisis de URL
                            </Text>

                            <Text style={[styles.resultText, { color: currentTheme.text }]}>
                                🌐 Dominio: {analysisResult?.domain || 'No disponible'}
                            </Text>
                            <Text style={[styles.resultText, { color: currentTheme.text }]}>
                                📌 IP: {analysisResult?.ip || 'No disponible'}
                            </Text>

                            <Text style={[styles.resultText, { color: currentTheme.text, fontWeight: 'bold', marginTop: 10 }]}>
                                ⚠️ Mensaje de Phishing:
                            </Text>
                            <Text style={[styles.resultText, { color: currentTheme.text }]}>
                                   - Detectado: {analysisResult?.phishingMessage?.detected ? 'Sí' : 'No'}
                            </Text>
                            <Text style={[styles.resultText, { color: currentTheme.text }]}>
                                   - Mensaje: {analysisResult?.phishingMessage?.message || 'No disponible'}
                            </Text>
                            <Text style={[styles.resultText, { color: currentTheme.text }]}>
                                   - Nivel de Riesgo: {analysisResult?.phishingMessage?.risk_level || 'No disponible'}
                            </Text>

                            <Text style={[styles.resultText, { color: currentTheme.text, marginTop: 10 }]}>
                                {analysisResult?.reputationResult || 'No disponible'}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15 }}>
                            <TouchableOpacity 
                                style={[styles.analyzeButton, { backgroundColor: currentTheme.primary }]} 
                                onPress={sendEmail}
                            >
                                <Text style={styles.buttonText}>Enviar Correo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.analyzeButton, { backgroundColor: currentTheme.primary }]} 
                                onPress={handleClear}
                            >
                                <Text style={styles.buttonText}>Cerrar Reporte</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.titleSection}>
                    {/* Title section content if needed */}
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
                        theme={currentTheme}
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
                            theme={currentTheme}
                        />
                    ))}

                    {tab == 2 && news.slice(Math.ceil(news.length / 2)).map(item => (
                        <ListItem
                            key={item.url}
                            photo={item.url_to_image}
                            title={item.title}
                            subtitle={item.description}
                            onPress={() => handleOpenURL(item.url)}
                            theme={currentTheme}
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
    },
    scrollView: {
        padding: '20@vs',
    },
    container_img: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10@vs'
    },
    title: {
        fontSize: '15@vs',
        fontFamily: 'Roboto-Medium',
    },
    imageBackground: {
        width: '40@s',
        height: '35@vs',
    },
    containerInput: {
        flexDirection: 'row',
        borderWidth: '1@s',
        borderRadius: 8,
        paddingHorizontal: '10@s',
        alignItems: 'center',
        marginBottom: '10@vs',
    },
    search: {
        marginRight: '5@s'
    },
    url: {
        fontSize: '12@vs',
        width: '70%',
        paddingVertical: '8@vs',
    },
    analyzeButton: {
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
        fontSize: '15@vs'
    },
    switch: {
        marginVertical: '15@vs'
    },
    tabs: {
        marginBottom: '10@vs'
    },
    analysisResult: {
        marginVertical: '15@vs',
        padding: '15@s',
        borderWidth: 1,
        borderRadius: 8,
    },
    resultText: {
        fontSize: '14@vs',
        marginBottom: '3@vs',
    },
});

export default HomeScreen;