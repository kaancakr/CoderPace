import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import firebase from "@/FirebaseConfig";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [rememberMe, setRememberMe] = useState(false);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.navigate("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const loadStoredUsername = async () => {
      try {
        const storedLoginInfo = await AsyncStorage.getItem("lastLoginInfo");
        if (storedLoginInfo) {
          const {
            username,
            password,
            rememberMe: storedRememberMe,
          } = JSON.parse(storedLoginInfo);
          setEmailAddress(username);
          setPassword(password);
          setRememberMe(storedRememberMe);
        }
      } catch (error) {
        console.error("Error loading stored login information:", error);
      }
    };
    loadStoredUsername();
  }, []);

  const loginUser = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);

      if (rememberMe) {
        saveLoginInfo();
      } else {
        await AsyncStorage.removeItem("lastLoginInfo");
      }
      router.navigate("/login");
    } catch (error) {}
  };

  const saveLoginInfo = async () => {
    try {
      await AsyncStorage.setItem(
        "lastLoginInfo",
        JSON.stringify({ emailAddress, password, rememberMe })
      );
    } catch (error) {
      console.error("Error saving login information to AsyncStorage:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text style={styles.title}>
        {type === "login" ? "Welcome back" : "Create your account"}
      </Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
      </View>

      {type === "login" ? (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Login;
