import React from 'react';
import { Feather } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import * as MailComposer from "expo-mail-composer"; 


import styles from '../Detail/styles';
import imgLogo from "../../assets/logo.png";

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident; //parametro incident é enviado no navigation.navigate da página anterior
    const msg = `Olá, ${incident.name}. Gostaria de ajudar no caso ${incident.title} com o valor de 
        ${Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack(); //navega para página anterior
    }

    function sendMail(){
        MailComposer.composeAsync({ //abre app padrão de email (em geral será o gmail no android) com os dados abaixo ja preenchidos em um novo email
            subject: `Herói do Caso: ${incident.title}`,
            recipients: [incident.email],
            body: msg
        })
    }

    function sendWhatsapp(){ //abre whatsapp do contato marcado no incidente com a msg já preenchida
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${msg}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={imgLogo} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG: </Text>
                <Text style={styles.incidentValue}>{incident.name} - {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO: </Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR: </Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia:</Text>
                <Text style={styles.heroTitle}>Seja o herói deste caso</Text>

                <Text style={styles.heroDescription}>Entre em Contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}