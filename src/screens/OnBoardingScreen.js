import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Modal, ScrollView, StatusBar, useColorScheme } from 'react-native';
import Security from '../assets/images/svg/secutiry.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

// Theme colors for light and dark mode
const theme = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    secondaryText: '#555555',
    primary: '#008b8b',
    primaryDark: '#007777',
    border: '#f0f0f0',
    modalBackground: '#FFFFFF',
    modalOverlay: 'rgba(0,0,0,0.6)',
    boldText: '#333333',
    statusBar: 'dark-content',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    secondaryText: '#AAAAAA',
    primary: '#02BEBE',
    primaryDark: '#01AEAE',
    border: '#2A2A2A',
    modalBackground: '#1E1E1E',
    modalOverlay: 'rgba(0,0,0,0.8)',
    boldText: '#FFFFFF',
    statusBar: 'light-content',
  }
};

const OnBoardingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  
  // Default to light if colorScheme is null
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;
  
  // Verificar si los términos ya fueron aceptados solo al inicio
  useEffect(() => {
    const checkTermsAccepted = async () => {
      try {
        const accepted = await AsyncStorage.getItem('termsAccepted');
        // Solo mostrar el modal si explícitamente no ha aceptado (null o false)
        if (accepted !== 'true') {
          setModalVisible(true);
        } else {
          // Si ya aceptó anteriormente, permitir navegar directamente
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error al obtener términos aceptados:', error);
      }
    };
    checkTermsAccepted();
  }, [navigation]);

  // Guardar aceptación de términos y navegar
  const acceptTerms = async () => {
    try {
      await AsyncStorage.setItem('termsAccepted', 'true');
      setModalVisible(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al guardar términos aceptados:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar 
        backgroundColor={currentTheme.background} 
        barStyle={currentTheme.statusBar} 
      />
      
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: currentTheme.primary }]}>PHISH GUARD</Text>
        <Text style={[styles.subtitle, { color: currentTheme.secondaryText }]}>
          Protección contra ataques de phishing
        </Text>
      </View>
      
      <View style={styles.container_img}>
        <Security width={scale(280)} height={verticalScale(280)} />
      </View>
      
      <View style={styles.bottomContainer}>
        <Text style={[styles.description, { color: currentTheme.secondaryText }]}>
          Detecta y previene amenazas de phishing para mantener tu información segura
        </Text>
        
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: currentTheme.primary }]} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.btn_label}>Comenzar</Text>
          <MaterialIcons name="arrow-forward-ios" size={moderateScale(18)} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Modal de Términos y Condiciones */}
      <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: currentTheme.modalOverlay }]}>
          <View style={[styles.modalContent, { backgroundColor: currentTheme.modalBackground }]}>
            <View style={[styles.modalHeader, { borderBottomColor: currentTheme.border }]}>
              <Text style={[styles.modalTitle, { color: currentTheme.primary }]}>
                Términos y Condiciones de Uso
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={moderateScale(24)} color={currentTheme.primary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalText, { color: currentTheme.secondaryText }]}>
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>
                  Última actualización: 15/04/2025
                </Text>{"\n\n"}
                Bienvenido a PhishGuard. Al utilizar nuestra aplicación, usted acepta cumplir con los siguientes términos y condiciones. Si no está de acuerdo, le solicitamos que no la use.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>1. Aceptación de los Términos</Text>{"\n"}
                Al descargar o utilizar PhishGuard, acepta estos términos. Si no está de acuerdo, no podrá utilizar la aplicación.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>2. Uso de la Aplicación</Text>{"\n"}
                PhishGuard ayuda a detectar ataques de phishing en internet.{"\n"}
                - <Text style={[styles.bold, { color: currentTheme.boldText }]}>Versión gratuita:</Text> Incluye anuncios y funciones limitadas.{"\n"}
                - <Text style={[styles.bold, { color: currentTheme.boldText }]}>Versión premium:</Text> Ofrece características avanzadas mediante un pago único.{"\n"}
                El usuario se compromete a no utilizar la aplicación de forma indebida.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>3. Registro y Cuenta de Usuario</Text>{"\n"}
                Algunas funciones requieren crear una cuenta. El usuario debe proporcionar información precisa y mantener la confidencialidad de sus credenciales.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>4. Protección de Datos Personales</Text>{"\n"}
                Respetamos su privacidad. Al utilizar la aplicación, acepta nuestra Política de Privacidad.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>5. Propiedad Intelectual</Text>{"\n"}
                Todo el contenido de PhishGuard es propiedad de la empresa. No está permitido reproducir o distribuir el material sin autorización.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>6. Limitación de Responsabilidad</Text>{"\n"}
                PhishGuard no garantiza detectar todos los intentos de phishing y no se hace responsable por daños derivados de su uso.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>7. Suscripciones y Pagos</Text>{"\n"}
                La versión premium requiere un pago procesado a través de Google Play o App Store. La suscripción se renovará automáticamente a menos que se cancele.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>8. Modificaciones de los Términos</Text>{"\n"}
                Nos reservamos el derecho de modificar estos términos. Los cambios se publicarán en esta página y su uso continuado implicará aceptación.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>9. Terminación</Text>{"\n"}
                Podemos suspender el acceso a la aplicación sin previo aviso en caso de incumplimiento de estos términos.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>10. Ley Aplicable y Resolución de Disputas</Text>{"\n"}
                Estos términos se rigen por la legislación del país de registro de PhishGuard. Las disputas se resolverán mediante arbitraje o mediación.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>11. Contacto</Text>{"\n"}
                Para consultas, contáctenos en:{"\n"}
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>Email:</Text> reportphishguard@gmail.com{"\n"}
              </Text>
              
              <Text style={[styles.modalTitle, {marginTop: verticalScale(20), color: currentTheme.primary}]}>
                Política de Privacidad
              </Text>
              <Text style={[styles.modalText, { color: currentTheme.secondaryText }]}>
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>
                  Última actualización: 20/01/2025
                </Text>{"\n\n"}
                Nos comprometemos a proteger su privacidad. Al usar PhishGuard, acepta las prácticas descritas en esta política.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>1. Información que Recopilamos</Text>{"\n"}
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>1.1 Información proporcionada:</Text>{"\n"}
                - Registro de cuenta: nombre, correo electrónico y otros datos relevantes.{"\n"}
                - Suscripciones y pagos: datos relacionados con la compra de la versión premium.{"\n"}
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>1.2 Información recopilada automáticamente:</Text>{"\n"}
                - Datos de uso: frecuencia, funciones utilizadas, tiempos de acceso.{"\n"}
                - Información técnica: IP, tipo de dispositivo, sistema operativo.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>2. Uso de la Información</Text>{"\n"}
                - Operar y mejorar la aplicación.{"\n"}
                - Personalizar la experiencia del usuario.{"\n"}
                - Proporcionar soporte técnico.{"\n"}
                - Analizar el uso de la aplicación y mejorar su seguridad.{"\n"}
                - Enviar notificaciones sobre actualizaciones y ofertas.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>3. Compartir y Divulgar Información</Text>{"\n"}
                - Proveedores de servicios: terceros que ayudan con pagos, análisis y almacenamiento de datos.{"\n"}
                - Cumplimiento legal: divulgación de información si lo exige la ley.{"\n"}
                - No compartimos información con anunciantes.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>4. Seguridad de la Información</Text>{"\n"}
                Aplicamos medidas de seguridad como cifrado, pero no podemos garantizar protección total.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>5. Retención de Datos</Text>{"\n"}
                Mantenemos su información mientras sea necesario para cumplir con esta política.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>6. Sus Derechos</Text>{"\n"}
                - Acceso y corrección de datos desde la configuración de la cuenta.{"\n"}
                - Solicitud de eliminación de datos mediante contacto directo.{"\n"}
                - Retiro del consentimiento en cualquier momento.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>7. Cookies y Tecnologías Similares</Text>{"\n"}
                Usamos cookies para mejorar la experiencia del usuario.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>8. Privacidad de los Niños</Text>{"\n"}
                No recopilamos información de menores de 13 años.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>9. Modificaciones a la Política</Text>{"\n"}
                Podemos actualizar esta política y notificaremos los cambios.{"\n\n"}
                
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>10. Contacto</Text>{"\n"}
                Para preguntas o inquietudes:{"\n"}
                <Text style={[styles.bold, { color: currentTheme.boldText }]}>Email:</Text> reportphishguard@gmail.com
              </Text>
            </ScrollView>
            
            <View style={[styles.buttonContainer, { borderTopColor: currentTheme.border }]}>
              <TouchableOpacity 
                style={[styles.acceptButton, { backgroundColor: currentTheme.primary }]} 
                onPress={acceptTerms}
                activeOpacity={0.8}
              >
                <Text style={styles.acceptButtonText}>Aceptar Términos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: '40@vs',
  },
  title: {
    fontSize: '32@vs',
    fontWeight: 'bold',
    letterSpacing: '1@s',
  },
  subtitle: {
    fontSize: '16@vs',
    marginTop: '8@vs',
  },
  container_img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '20@vs',
  },
  bottomContainer: {
    paddingHorizontal: '24@s',
    marginBottom: '40@vs',
  },
  description: {
    fontSize: '16@vs',
    textAlign: 'center',
    marginBottom: '24@vs',
    lineHeight: '22@vs',
  },
  btn: {
    padding: '16@vs',
    borderRadius: '10@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn_label: {
    fontSize: '18@vs',
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16@s',
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: '16@ms',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16@ms',
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: '20@vs',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: '16@ms',
    maxHeight: '60%',
  },
  modalText: {
    fontSize: '15@vs',
    lineHeight: '22@vs',
    marginBottom: '16@vs',
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: '16@ms',
    borderTopWidth: 1,
  },
  acceptButton: {
    padding: '16@vs',
    alignItems: 'center',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  acceptButtonText: {
    color: '#FFF',
    fontSize: '18@vs',
    fontWeight: 'bold',
  },
});

export default OnBoardingScreen;