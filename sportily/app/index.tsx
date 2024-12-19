import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Index() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext); // Access context values
  const router = useRouter(); // Hook for navigation

  const handleLogin = () => {
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

    // Basic email validation
    if (!email) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    // Basic password validation
    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors); // Update error state

    if (formValid) {
      // Check if credentials match with context values
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true); // Update authentication status
        router.push("/home"); // Redirect to home page
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" }); // Show error if credentials don't match
      }
    }
  };

  return (
    // <ImageBackground
    //   source={{
    //     uri: "https://preview.redd.it/i-made-cristiano-ronaldo-wallpaper-1284-x-2778-full-hd-v0-0ycaahii6a0e1.png?width=1080&crop=smart&auto=webp&s=6d3a5400241b7b73e2b960b7987ad6a246928918",
    //   }}
    //   style={styles.backgroundImage}
    // >
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dfssgotc9/image/upload/v1734626153/sportapp_kvinjm.png",
          }}
          style={styles.cardImage}
        />
      </View>
      {/* Input Fields */}
      <TextInput
        placeholderTextColor="#000"
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        placeholderTextColor="#000"
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don’t have an account yet?{" "}
        <Text style={styles.link}>
          <Link href="/register">Sign Up</Link>
        </Text>
      </Text>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.514)", // Optional overlay for readability
  },
  logoContainer: {
    flexDirection: "row",

    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    // backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#8a2851",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#c93673",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  cardImage: {
    height: 80,
    width: "120%",
  },
});
