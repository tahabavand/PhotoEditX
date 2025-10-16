import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 PhotoEditX</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>انتخاب عکس</Text>
      </TouchableOpacity>
      {image && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit', { image })}>
          <Text style={styles.buttonText}>ویرایش عکس</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  image: { width:250, height:250, marginBottom:20, borderRadius:10 },
  button: { backgroundColor:'#007bff', padding:10, borderRadius:5, marginTop:10 },
  buttonText: { color:'#fff', fontWeight:'bold' },
});
