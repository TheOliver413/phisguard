import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import Security from '../assets/images/svg/secutiry.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";

const OnBoardingScreen = ({ navigation }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Verificar si los términos ya fueron aceptados
  useEffect(() => {
      const checkTermsAccepted = async () => {
          try {
              const accepted = await AsyncStorage.getItem('termsAccepted');
              if (!accepted) {
                  setShowTerms(true);
                  setModalVisible(true); // Si no se han aceptado, mostrar modal
              }
          } catch (error) {
              console.error('Error al obtener términos aceptados:', error);
          }
      };
      checkTermsAccepted();
  }, []);

  const openTermsModal = () => setModalVisible(true);

  // Guardar aceptación de términos y navegar
  const acceptTerms = async () => {
      try {
          await AsyncStorage.setItem('termsAccepted', 'true');
          setModalVisible(false);
          setShowTerms(false);
          navigation.navigate('Login');
      } catch (error) {
          console.error('Error al guardar términos aceptados:', error);
      }
  };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>PHISH GUARD</Text>
            </View>
            <View style={styles.container_img}>
                <Security width={scale(300)} height={verticalScale(300)} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={openTermsModal}>
                <Text style={styles.btn_label}>Phishing Guard</Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color="#FFF" />
            </TouchableOpacity>

            {/* Modal de Términos y Condiciones */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <ScrollView>
                      <Text style={styles.modalTitle}>Términos y Condiciones de Uso</Text>
                      <Text style={styles.modalText}>
                          <Text style={styles.bold}>Última actualización: 20/01/2025</Text>{"\n\n"}
                          Bienvenido a PhishGuard. Al utilizar nuestra aplicación, usted acepta cumplir con los siguientes términos y condiciones. Si no está de acuerdo, le solicitamos que no la use.{"\n\n"}
                          
                          <Text style={styles.bold}>1. Aceptación de los Términos</Text>{"\n"}
                          Al descargar o utilizar PhishGuard, acepta estos términos. Si no está de acuerdo, no podrá utilizar la aplicación.{"\n\n"}
                          
                          <Text style={styles.bold}>2. Uso de la Aplicación</Text>{"\n"}
                          PhishGuard ayuda a detectar ataques de phishing en internet.{"\n"}
                          - <Text style={styles.bold}>Versión gratuita:</Text> Incluye anuncios y funciones limitadas.{"\n"}
                          - <Text style={styles.bold}>Versión premium:</Text> Ofrece características avanzadas mediante un pago único.{"\n"}
                          El usuario se compromete a no utilizar la aplicación de forma indebida.{"\n\n"}
                          
                          <Text style={styles.bold}>3. Registro y Cuenta de Usuario</Text>{"\n"}
                          Algunas funciones requieren crear una cuenta. El usuario debe proporcionar información precisa y mantener la confidencialidad de sus credenciales.{"\n\n"}
                          
                          <Text style={styles.bold}>4. Protección de Datos Personales</Text>{"\n"}
                          Respetamos su privacidad. Al utilizar la aplicación, acepta nuestra Política de Privacidad.{"\n\n"}
                          
                          <Text style={styles.bold}>5. Propiedad Intelectual</Text>{"\n"}
                          Todo el contenido de PhishGuard es propiedad de la empresa. No está permitido reproducir o distribuir el material sin autorización.{"\n\n"}
                          
                          <Text style={styles.bold}>6. Limitación de Responsabilidad</Text>{"\n"}
                          PhishGuard no garantiza detectar todos los intentos de phishing y no se hace responsable por daños derivados de su uso.{"\n\n"}
                          
                          <Text style={styles.bold}>7. Suscripciones y Pagos</Text>{"\n"}
                          La versión premium requiere un pago procesado a través de Google Play o App Store. La suscripción se renovará automáticamente a menos que se cancele.{"\n\n"}
                          
                          <Text style={styles.bold}>8. Modificaciones de los Términos</Text>{"\n"}
                          Nos reservamos el derecho de modificar estos términos. Los cambios se publicarán en esta página y su uso continuado implicará aceptación.{"\n\n"}
                          
                          <Text style={styles.bold}>9. Terminación</Text>{"\n"}
                          Podemos suspender el acceso a la aplicación sin previo aviso en caso de incumplimiento de estos términos.{"\n\n"}
                          
                          <Text style={styles.bold}>10. Ley Aplicable y Resolución de Disputas</Text>{"\n"}
                          Estos términos se rigen por la legislación del país de registro de PhishGuard. Las disputas se resolverán mediante arbitraje o mediación.{"\n\n"}
                          
                          <Text style={styles.bold}>11. Contacto</Text>{"\n"}
                          Para consultas, contáctenos en:{"\n"}
                          <Text style={styles.bold}>Email:</Text> reportphishguard@gmail.com{"\n"}
                      </Text>
                      <Text style={styles.modalTitle}>Política de Privacidad</Text>
                      <Text style={styles.modalText}>
                          <Text style={styles.bold}>Última actualización: 20/01/2025</Text>{"\n\n"}
                          Nos comprometemos a proteger su privacidad. Al usar PhishGuard, acepta las prácticas descritas en esta política.{"\n\n"}
                          
                          <Text style={styles.bold}>1. Información que Recopilamos</Text>{"\n"}
                          <Text style={styles.bold}>1.1 Información proporcionada:</Text>{"\n"}
                          - Registro de cuenta: nombre, correo electrónico y otros datos relevantes.{"\n"}
                          - Suscripciones y pagos: datos relacionados con la compra de la versión premium.{"\n"}
                          <Text style={styles.bold}>1.2 Información recopilada automáticamente:</Text>{"\n"}
                          - Datos de uso: frecuencia, funciones utilizadas, tiempos de acceso.{"\n"}
                          - Información técnica: IP, tipo de dispositivo, sistema operativo.{"\n\n"}
                          
                          <Text style={styles.bold}>2. Uso de la Información</Text>{"\n"}
                          - Operar y mejorar la aplicación.{"\n"}
                          - Personalizar la experiencia del usuario.{"\n"}
                          - Proporcionar soporte técnico.{"\n"}
                          - Analizar el uso de la aplicación y mejorar su seguridad.{"\n"}
                          - Enviar notificaciones sobre actualizaciones y ofertas.{"\n\n"}
                          
                          <Text style={styles.bold}>3. Compartir y Divulgar Información</Text>{"\n"}
                          - Proveedores de servicios: terceros que ayudan con pagos, análisis y almacenamiento de datos.{"\n"}
                          - Cumplimiento legal: divulgación de información si lo exige la ley.{"\n"}
                          - No compartimos información con anunciantes.{"\n\n"}
                          
                          <Text style={styles.bold}>4. Seguridad de la Información</Text>{"\n"}
                          Aplicamos medidas de seguridad como cifrado, pero no podemos garantizar protección total.{"\n\n"}
                          
                          <Text style={styles.bold}>5. Retención de Datos</Text>{"\n"}
                          Mantenemos su información mientras sea necesario para cumplir con esta política.{"\n\n"}
                          
                          <Text style={styles.bold}>6. Sus Derechos</Text>{"\n"}
                          - Acceso y corrección de datos desde la configuración de la cuenta.{"\n"}
                          - Solicitud de eliminación de datos mediante contacto directo.{"\n"}
                          - Retiro del consentimiento en cualquier momento.{"\n\n"}
                          
                          <Text style={styles.bold}>7. Cookies y Tecnologías Similares</Text>{"\n"}
                          Usamos cookies para mejorar la experiencia del usuario.{"\n\n"}
                          
                          <Text style={styles.bold}>8. Privacidad de los Niños</Text>{"\n"}
                          No recopilamos información de menores de 13 años.{"\n\n"}
                          
                          <Text style={styles.bold}>9. Modificaciones a la Política</Text>{"\n"}
                          Podemos actualizar esta política y notificaremos los cambios.{"\n\n"}
                          
                          <Text style={styles.bold}>10. Contacto</Text>{"\n"}
                          Para preguntas o inquietudes:{"\n"}
                          <Text style={styles.bold}>Email:</Text> reportphishguard@gmail.com
                      </Text>
                  </ScrollView>
                        <TouchableOpacity style={styles.acceptButton} onPress={acceptTerms}>
                            <Text style={styles.acceptButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: '30@vs',
        fontWeight: 'bold',
        color: '#008b8b',
        marginTop: '20@vs',
    },
    btn: {
        backgroundColor: '#008b8b',
        padding: '15@vs',
        width: '90%',
        borderRadius: '5@ms',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20@vs'
    },
    btn_label: {
        fontSize: '15@vs',
        color: '#FFF',
        fontFamily: 'Roboto-BlackItalic',
    },
    container_img: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        margin: 'auto',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: '20@ms',
        paddingTop: '30@vs',
        paddingBottom: '30@vs',
        borderRadius: '10@ms',
    },
    modalTitle: {
        fontSize: '18@vs',
        fontWeight: 'bold',
        marginBottom: '10@vs',
    },
    modalText: {
        fontSize: '14@vs',
        textAlign: 'justify',
        marginBottom: '15@vs',
    },
    acceptButton: {
        backgroundColor: '#008b8b',
        padding: '10@vs',
        alignItems: 'center',
        borderRadius: '5@ms',
    },
    acceptButtonText: {
        color: '#FFF',
        fontSize: '16@vs',
        fontWeight: 'bold',
    },
});

export default OnBoardingScreen;
