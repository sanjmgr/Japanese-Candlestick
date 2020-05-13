import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {CandleMode} from "./Candle";
import moment from 'moment';
import Row from "./Row";

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black'
  },
  table: {
    flexDirection: "row",
    padding: 16
  },
  column: {
    flex: 1
  },
  separator:{
    width: 20
  },
  date: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500'
  }
});

interface ValuesProps {
  candles: CandleMode[];
  caliber: number;
}

const roundToTwo = (value: number) => +(Math.round(Number(value + "e+2"))  + "e-2");


export default ({candles, caliber}: ValuesProps) => {
  const [{date, open, close, high, low}, setCandle] = useState(candles[0]);
  const diff = ((close - open) * 100 / open) + '';
  const change:number = close - open < 0 ? +diff.substring(0, 5) : +diff.substring(0, 4);
    return(
        <SafeAreaView style={styles.container}>
          <View style={styles.table}>
            <View style={styles.column}>
              <Row label='Open' value={roundToTwo(open)}/>
              <Row label='Close' value={roundToTwo(close)}/>
              <Row label='Volume' value={roundToTwo(5656)}/>
            </View>
            <View style={styles.separator} ></View>
            <View style={styles.column}>
              <Row label='High' value={roundToTwo(high)}/>
              <Row label='Low' value={roundToTwo(low)}/>
              <Row label='Change' value={change} color={close - open > 0 ? '#4AFA9A' : '#E33F64'}/>
            </View>
          </View>
          <Text style={styles.date}>{moment(date).format('h:mm MMM Do, YYYY')}</Text>
        </SafeAreaView>
    );
};