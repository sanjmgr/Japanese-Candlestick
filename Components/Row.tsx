import React from "react";
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  label: {
    fontSize: 20,
    color: 'gray'
  },
  value:{
    fontSize: 20,
    fontVariant: ['tabular-nums']
  },
  color: {
    color: '#fff',
    textAlign: 'center',
  }
});

interface RowProps {
  label: string;
  value: number;
  color?: string;
}

export default ({label, value, color}: RowProps) => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, {color: color || '#fff'}]}>{value}</Text>
    </View>
  );
};