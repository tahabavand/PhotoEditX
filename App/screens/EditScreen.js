import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Slider, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

export default function EditScreen({ route }) {
  const { image } = route.params;
  const [editedImage, setEditedImage] = useState(image);
  const [brightness, setBrightness] = useState(0);

  const applyFilter = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      editedImage,
      [{ adjust: { brightness: brightness } }],
      { format: ImageManipulator.SaveFormat.PNG }
    );
    setEditedImage(manipResult.uri);
  };

  const saveImage = async () => {
    try {
      await MediaLibrary.saveToLibraryAsync(editedImage);
      Alert.alert('ذخیره شد ✅', 'عکس با موفقیت ذخیره شد');
    } catch (e) {
      Alert.alert('خطا ❌', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: editedImage }} style={styles.image} />
      <Text>Brightness: {brightness.toFixed(2)}</Text>
      <Slider
        style={{width:250, height:40}}
        minimumValue={-1}
        maximumValue={1}
        value={brightness}
        onValueChange={setBrightness}
      />
      <TouchableOpacity style={styles.button} onPress={applyFilter}>
        <Text style={styles.buttonText}>اعمال فیلتر</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={saveImage}>
        <Text style={styles.buttonText}>ذخیره عکس</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'},
  image:{width:300,height:300,borderRadius:10,marginBottom:10},
  button:{backgroundColor:'#28a745',padding:10,borderRadius:5,marginTop:10},
  buttonText:{color:'#fff',fontWeight:'bold'}
});
