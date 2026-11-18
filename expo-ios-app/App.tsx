import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // Sadece Apple iPhone cihazlarda çalışması için çalışma zamanı kontrolü
  if (Platform.OS !== 'ios' || Platform.isPad) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <Text style={styles.greeting}>Merhaba</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: -0.5,
    color: '#000000',
  },
});
