import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const [savedValue, setSavedValue] = React.useState();

  React.useEffect(() => {
    const getValue = async () => {
      const secureValue = await SecureStore.getItemAsync('exampleKey');
      setSavedValue(secureValue);
    }

    getValue();
  }, []);

  const saveToSecure = async () => {
    await SecureStore.setItemAsync('exampleKey', 'foobar');
  };

  const readFromSecure = async() => {
    const secureValue = await SecureStore.getItemAsync('exampleKey');
    setSavedValue(secureValue);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Text>
        This is saved value:
        {savedValue}
        End of Saved value.
      </Text>
      <Button
        onPress={() => saveToSecure()}
        title="Save to SecureStore"
      />
      <Button
        onPress={() => readFromSecure()}
        title="Read from SecureStore"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
