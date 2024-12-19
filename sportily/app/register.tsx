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
// import { ClickCountContext } from "./context"; // Import the context

export default function Register() {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext); // Access context functions
  const router = useRouter(); // Hook for navigation

  const handleSignUp = () => {
    setYourName(name);
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

    // Basic name validation
    if (!name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

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
      // Save email and password in context
      setUserEmail(email);
      setUserPassword(password);
      router.push("/"); // Navigate to login page
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
      {/* Sign Up Header */}
      {/* <Text style={styles.title}>Sign Up</Text> */}
      {/* Input Fields */}
      <TextInput
        placeholderTextColor="#000"
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Footer Text */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.link}>
          <Link href="/">Login</Link>
        </Text>
      </Text>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: "cover",
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.514)", // Optional overlay for readability
    padding: 20,
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 50,
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFD700", // Example color for the logo
    margin: 5,
    borderRadius: 5,
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
  cardImage: {
    height: 80,
    width: "120%",
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
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
