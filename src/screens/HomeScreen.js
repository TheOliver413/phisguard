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
    ActivityIndicator,
    Modal,
    Pressable
} from "react-native";
import { scale, ScaledSheet, verticalScale, moderateScale } from "react-native-size-matters";
import { freeGames, paidGames, sliderData } from "../model/data";
import { widthHeigth, windowWidth } from "../utils/Dimensions";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../config";
import axios from "axios";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        loaderBackground: 'rgba(255, 255, 255, 0.8)',
        modalBackground: '#FFFFFF',
        modalOverlay: 'rgba(0, 0, 0, 0.5)',
        danger: '#e74c3c',
        warning: '#f39c12',
        success: '#2ecc71',
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
        loaderBackground: 'rgba(18, 18, 18, 0.8)',
        modalBackground: '#1E1E1E',
        modalOverlay: 'rgba(0, 0, 0, 0.7)',
        danger: '#e74c3c',
        warning: '#f39c12',
        success: '#2ecc71',
    }
};

const HomeScreen = ({ navigation }) => {
    const [url, setUrl] = useState("");
    const [tab, setTap] = useState('1')
    const [analysisResult, setAnalysisResult] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { userInfo, isLoading } = useContext(AuthContext);
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [analyzingUrl, setAnalyzingUrl] = useState(false);
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
            setAnalyzingUrl(true); // Activar el loader
            setAnalysisResult(null); // Limpiar resultados anteriores
            
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
            
            // Mostrar el modal con los resultados
            setModalVisible(true);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Algo salió mal. Intenta nuevamente.');
        } finally {
            setAnalyzingUrl(false); // Desactivar el loader independientemente del resultado
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
        setModalVisible(false);
        setUrl("");
    };

    // Determinar el color del nivel de riesgo
    const getRiskColor = (riskLevel) => {
        if (!riskLevel) return currentTheme.secondaryText;
        
        riskLevel = riskLevel.toLowerCase();
        if (riskLevel.includes('alto') || riskLevel.includes('high')) {
            return currentTheme.danger;
        } else if (riskLevel.includes('medio') || riskLevel.includes('medium')) {
            return currentTheme.warning;
        } else if (riskLevel.includes('bajo') || riskLevel.includes('low')) {
            return currentTheme.success;
        }
        return currentTheme.secondaryText;
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
            {/* Modal de resultados del análisis */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={[styles.centeredView, { backgroundColor: currentTheme.modalOverlay }]}>
                    <View style={[styles.modalView, { backgroundColor: currentTheme.modalBackground }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>
                                Resultado del Análisis
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={moderateScale(24)} color={currentTheme.text} />
                            </TouchableOpacity>
                        </View>
                        
                        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                            {analysisResult && (
                                <View>
                                    <View style={styles.resultSection}>
                                        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                                            🌐 Información del Dominio
                                        </Text>
                                        <View style={styles.resultItem}>
                                            <Text style={[styles.resultLabel, { color: currentTheme.secondaryText }]}>
                                                Dominio:
                                            </Text>
                                            <Text style={[styles.resultValue, { color: currentTheme.text }]}>
                                                {analysisResult.domain || 'No disponible'}
                                            </Text>
                                        </View>
                                        <View style={styles.resultItem}>
                                            <Text style={[styles.resultLabel, { color: currentTheme.secondaryText }]}>
                                                IP:
                                            </Text>
                                            <Text style={[styles.resultValue, { color: currentTheme.text }]}>
                                                {analysisResult.ip || 'No disponible'}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.resultSection}>
                                        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                                            ⚠️ Análisis de Phishing
                                        </Text>
                                        <View style={styles.resultItem}>
                                            <Text style={[styles.resultLabel, { color: currentTheme.secondaryText }]}>
                                                Detectado:
                                            </Text>
                                            <Text style={[
                                                styles.resultValue, 
                                                { 
                                                    color: analysisResult.phishingMessage?.detected 
                                                        ? currentTheme.danger 
                                                        : currentTheme.success,
                                                    fontWeight: 'bold'
                                                }
                                            ]}>
                                                {analysisResult.phishingMessage?.detected ? 'Sí' : 'No'}
                                            </Text>
                                        </View>
                                        <View style={styles.resultItem}>
                                            <Text style={[styles.resultLabel, { color: currentTheme.secondaryText }]}>
                                                Mensaje:
                                            </Text>
                                            <Text style={[styles.resultValue, { color: currentTheme.text }]}>
                                                {analysisResult.phishingMessage?.message || 'No disponible'}
                                            </Text>
                                        </View>
                                        <View style={styles.resultItem}>
                                            <Text style={[styles.resultLabel, { color: currentTheme.secondaryText }]}>
                                                Nivel de Riesgo:
                                            </Text>
                                            <Text style={[
                                                styles.resultValue, 
                                                { 
                                                    color: getRiskColor(analysisResult.phishingMessage?.risk_level),
                                                    fontWeight: 'bold'
                                                }
                                            ]}>
                                                {analysisResult.phishingMessage?.risk_level || 'No disponible'}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.resultSection}>
                                        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                                            📊 Reputación
                                        </Text>
                                        <Text style={[styles.reputationText, { color: currentTheme.text }]}>
                                            {analysisResult.reputationResult || 'No disponible'}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                        
                        <View style={styles.modalActions}>
                            <TouchableOpacity 
                                style={[styles.modalButton, { backgroundColor: currentTheme.primary }]}
                                onPress={sendEmail}
                            >
                                <Ionicons name="mail-outline" size={moderateScale(16)} color="#FFFFFF" />
                                <Text style={styles.modalButtonText}>Enviar Reporte</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.modalButton, { backgroundColor: currentTheme.secondaryText }]}
                                onPress={handleClear}
                            >
                                <Ionicons name="close-circle-outline" size={moderateScale(16)} color="#FFFFFF" />
                                <Text style={styles.modalButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
                        editable={!analyzingUrl} // Deshabilitar durante el análisis
                    />
                    <TouchableOpacity 
                        style={[
                            styles.analyzeButton, 
                            { 
                                backgroundColor: analyzingUrl ? currentTheme.secondaryText : currentTheme.primary,
                                opacity: analyzingUrl ? 0.7 : 1
                            }
                        ]} 
                        onPress={validateUrl}
                        disabled={analyzingUrl} // Deshabilitar durante el análisis
                    >
                        {analyzingUrl ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Analizar</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Loader para el análisis */}
                {analyzingUrl && (
                    <View style={[styles.analysisLoader, { backgroundColor: currentTheme.resultBackground }]}>
                        <ActivityIndicator size="large" color={currentTheme.primary} />
                        <Text style={[styles.loaderText, { color: currentTheme.text }]}>
                            Analizando URL...
                        </Text>
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

                {/* Loader para las noticias */}
                {loadingNews ? (
                    <View style={styles.newsLoader}>
                        <ActivityIndicator size="large" color={currentTheme.primary} />
                        <Text style={[styles.loaderText, { color: currentTheme.text }]}>
                            Cargando noticias...
                        </Text>
                    </View>
                ) : (
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
                )}
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
        marginLeft: 'auto',
        minWidth: '60@s',
        alignItems: 'center',
        justifyContent: 'center',
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
    analysisLoader: {
        marginVertical: '15@vs',
        padding: '20@s',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newsLoader: {
        padding: '20@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderText: {
        marginTop: '10@vs',
        fontSize: '14@vs',
        fontFamily: 'Roboto-Medium',
    },
    // Estilos para el modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        maxHeight: '80%',
        borderRadius: '15@ms',
        padding: '5@ms',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '15@s',
        paddingVertical: '10@vs',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: '18@vs',
        fontWeight: 'bold',
    },
    modalContent: {
        padding: '15@s',
        maxHeight: '60%',
    },
    resultSection: {
        marginBottom: '15@vs',
    },
    sectionTitle: {
        fontSize: '16@vs',
        fontWeight: 'bold',
        marginBottom: '8@vs',
    },
    resultItem: {
        flexDirection: 'row',
        marginBottom: '5@vs',
    },
    resultLabel: {
        fontSize: '14@vs',
        fontWeight: '500',
        width: '35%',
    },
    resultValue: {
        fontSize: '14@vs',
        flex: 1,
    },
    reputationText: {
        fontSize: '14@vs',
        lineHeight: '20@vs',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: '15@vs',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '10@vs',
        paddingHorizontal: '15@s',
        borderRadius: '8@ms',
        minWidth: '120@s',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: '14@vs',
        fontWeight: '500',
        marginLeft: '5@s',
    },
});

export default HomeScreen;