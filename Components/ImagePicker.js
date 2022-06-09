import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const ImagePicker = () => {
  const [img, setImg] = useState(null);
  const handleClick = async () => {
    let res = await launchImageLibrary({
      selectionLimit: 0,
    });
    setImg(res?.assets);
    console.log(res.assets[0].uri);
  };
  return (
    <View>
      <TouchableOpacity style={style.button} onPress={handleClick}>
        <Text>Pick Image</Text>
        {img && (
          <Image
            style={style.img}
            // source={require('file:///data/user/0/com.pdfyash/cache/rn_image_picker_lib_temp_4cee4257-2dae-4b9f-a44d-f66c6833acb8.jpg')}
            source={{uri : img[0].uri}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 10,
    margin: 4,
  },
  img: {
    width: 200,
    height: 100,
  },
});
export default ImagePicker;
