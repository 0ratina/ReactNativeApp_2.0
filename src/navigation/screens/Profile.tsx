import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, View, ScrollView, Image, TextInput } from 'react-native';
import React, {useState} from 'react';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView>
      <TextInput
        style={{height: 40, padding: 5}}
        placeholder="Type to get Pizza!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </ScrollView>
      <Text>{route.params.user}working?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default Profile;
