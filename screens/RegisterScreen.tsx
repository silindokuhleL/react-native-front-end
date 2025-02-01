import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();

  const handleRegister = () => {
    // TODO: Implement actual registration logic
    setUser({
      id: '1',
      name: name,
      email: email,
      role: 'customer'
    });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <ThemedText style={styles.buttonText}>Register</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <ThemedText style={styles.linkText}>Already have an account? Login</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#210883',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#210883',
    textAlign: 'center',
  },
});