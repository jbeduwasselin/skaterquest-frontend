import { Button, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({ navigation }) {
 return (
   <View>
     <Text>Login Screen</Text>
     <Button
       title="Go to Home"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
}