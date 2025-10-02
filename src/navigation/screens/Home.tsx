import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View, Image } from 'react-native';
import { useBatteryLevel, useBatteryState, useLowPowerMode } from 'expo-battery';


export function Home() {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();
  const lowPowerMode = useLowPowerMode();


  return (
    <View style={styles.container}>
      <Text>WELCOME!</Text>
      <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      <Text>Home Screen</Text>
      <Button screen="Profile" params={{ user: 'jane' }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
      <View style={batterystyling.container}>
        <Text>This is the battery's state</Text>
        <Text>{batteryState}</Text>
        <Text>{lowPowerMode}</Text>
      <Text>Current Battery Level: {batteryLevel}</Text></View>

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

const batterystyling = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingBottom:60
  },
});


