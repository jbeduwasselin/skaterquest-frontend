import React, { useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  CameraView,
  FlashMode,
} from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import IconButton from "./IconButton";

const pictureOption = {
  quality: 0.3,
};

interface CameraObjProp {
  onPicture: (photo: CameraCapturedPicture) => void;
  style?: (StyleProp<ViewStyle> & object) | null;
}

export default function CameraObj({ onPicture, style = null }: CameraObjProp) {
  const isFocused = useIsFocused();
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<CameraType>("back");
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");

  function toggleCameraFacing() {
    setCameraFacing(cameraFacing === "back" ? "front" : "back");
  }
  function toggleCameraFlash() {
    setCameraFlash(cameraFlash === "off" ? "on" : "off");
  }
  async function takePicture() {
    const photo: CameraCapturedPicture | undefined =
      await cameraRef?.current?.takePictureAsync(pictureOption);

    photo && onPicture(photo);
  }

  async function askCameraPermission() {
    const result = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(result && result?.status === "granted");
  }

  useEffect(() => {
    askCameraPermission();
  }, []);
  console.log(cameraFacing);
  return (
    <View style={{ ...styles.container, ...style }}>
      {cameraPermission && isFocused ? (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={cameraFacing}
          flash={cameraFlash}
        >
          <View style={styles.topButtonContainer}>
            <IconButton
              iconColor="black"
              iconName="rotate-right"
              onPress={toggleCameraFacing}
              iconSize={30}
              style={styles.topButton}
            />
            <IconButton
              iconColor="black"
              iconName="flash"
              onPress={toggleCameraFlash}
              iconSize={30}
              style={styles.topButton}
            />
          </View>
          <IconButton
            iconColor="black"
            iconName="circle-thin"
            onPress={takePicture}
            iconSize={50}
            style={styles.bottomButton}
          />
        </CameraView>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  topButtonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topButton: {
    margin: 10,
  },
  bottomButton: {
    margin: 20,
  },
});
