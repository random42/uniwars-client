import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { Constants, LinearGradient } from 'expo';
import { Actions } from "react-native-router-flux";
import { RankList, Classifica } from '../components';
import Button from 'react-native-button';
import { inject, observer } from 'mobx-react/native';
import { toJS } from 'mobx';
import {
    Card,
    CardTitle,
    CardContent,
    CardAction,
    CardButton,
    CardImage
} from 'react-native-cards';

@inject('store') @observer
export class Home extends Component {
    render() {
        let players = this.props.store.rank.top_5;

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={this.play}>
                        <LinearGradient
                            start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#e509c4', '#2608e5']}
                            style={styles.playButtonContainer}>
                            <Text style={styles.playButtonText}>
                                Play!
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Classifica containerStyle={styles.rankTab} head={players.head} data={players.data} title="Top 5" />
                </ScrollView>
            </View>
        );
    }

    play() {
        Actions.game();
    }

}

{/*  */ }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /* justifyContent: "center", */
        /* alignItems: 'center',  */
        flexDirection: 'column',
        backgroundColor: "black",
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "yellow",
    },
    playButtonContainer: {
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * .5,
        height: 60,
        overflow: 'hidden',
        borderRadius: 50,
    },
    playButtonText: {
        fontSize: 30,
        color: '#FFFFFF',
        /* fontFamily: 'sans-serif', */
        fontWeight: 'bold',
    },
    scroll: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    rankTab: {
    },
    rankView: {
        alignSelf: 'stretch',
    }
});
