import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"; //módulo para fazer navegação
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

import imgLogo from "../../assets/logo.png"; //é importante ter 3 imagens de tamanhos diferentes pois em mobile as telas tem desidade de pixels
                                             //--então uma tela com 400 pixels em um celular mais moderno, tem 2 ou 3 vezes mais pixels que um outro menos moderno
                                             //--ao fazer o import em logo.png, a propria aplicação confere qual tamanho ficará melhor para a tela 

import styles from "./styles";

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);

    const navigation = useNavigation();

    async function loadIncidents(){
        if(loading || (total > 0 && incidents.length == total)){
            return; //impedir que loading seja disparado se usuário ficar puxando o scroll da lista para baixo
        }
        setloading(true);
        const response = await api.get('/incidents', {
            params: {page}
        });
        setIncidents([...incidents, ...response.data]); //esta linha anexa um vetor ao outro gerando um novo
        setTotal(response.headers["x-total-count"]);

        setPage(page + 1);
        setloading(false);
    }

    useEffect(() => { 
        loadIncidents();
    }, [] ); 

    function navigateToDetail(incident){
        navigation.navigate("Detail", { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={imgLogo} />
                <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total} casos.</Text></Text>
            </View>

            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList //Quando quero uma lista possível de scrollar, uso FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)} //sinaliza valor unico que individualiza cada nó do array
                showsVerticalScrollIndicator={false} //Remove barra de scroll
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG: </Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR: </Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident) }>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}