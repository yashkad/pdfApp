import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import RNImageToPdf from 'react-native-image-to-pdf';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const myAsyncPDFFunction = async (ImagesPath, fileName) => {
  try {
    const options = {
      imagePaths: ImagesPath,
      name: `${fileName}.pdf`,
      maxSize: {
        // optional maximum image dimension - larger images will be resized
        // width: 900,
        // height: Math.round((deviceHeight() / deviceWidth()) * 900),
        // height: 900,
        width: 900,
        height: Math.round((windowHeight / windowWidth) * 900),
      },
      quality: 0.3, // optional compression paramter
      targetPathRN: '/storage/emulated/0/Download/', // only for android version 9 and lower
      //for versions higher than 9 it is stored in (Download/img-to-pdf/)
    };
    const pdf = await RNImageToPdf.createPDFbyImages(options);
    alert("Created Succesfull")
    console.log('pdf.filePath ', pdf.filePath);
  } catch (e) {
    console.log('inside error', e);
  }
};

const ImagePicker = () => {
  const [img, setImg] = useState(null);

  const handleClick = async () => {
    let res = await launchImageLibrary({
      selectionLimit: 0,
    });
    setImg(res.assets);
    console.log('res', res.assets);
  };

  const generatePDF = () => {
    const imgURIs = img.map(item => {
      return item.uri.replace('file:///', '/');
    });
    myAsyncPDFFunction(imgURIs,Date.now());
  };
  return (
    <View>
      <TouchableOpacity style={style.button} onPress={handleClick}>
        <Text>
          Pick Image
        </Text>
        {/* {img && <Image style={style.img} source={{uri: img[0].uri}} />} */}
      </TouchableOpacity>
      {img && (
        <Text onPress={() => generatePDF()} style={style.txt}>
          GENERATE
        </Text>
      )}

      {img && (
        <FlatList
          data={img}
          keyExtractor={(_, i) => i}
          renderItem={({item}) => {
            return <Image style={style.img} source={{uri: item.uri}} />;
          }}
        />
      )}
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
    width: 300,
    height: 300,
    // resizeMode:"center",
    resizeMode: 'cover',
    // resizeMode:"contain",
    // resizeMode:"stretch",
  },
  txt: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: 'mediumvioletred',
    height: 30,
    fontWeight: 'bold',
  },
});
export default ImagePicker;
