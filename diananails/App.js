import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Pressable
        onPress={() => alert('Hello DianaNails!')}>
        <Text style={{ color: "white", borderWidth: 1, borderColor: "white", borderRadius: 5, padding: 10 }}>DianaNails App</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});
