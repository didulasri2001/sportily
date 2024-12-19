import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { ClickCountContext } from "./ClickCountContext";

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext);
  const [products, setProducts] = useState<any[]>([]);

  // Fetch sports-related products from Fakestore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=USA"
        );
        const data = await response.json();
        const firstFiveItems = data.countries.slice(5, 10);
        setProducts(firstFiveItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  // Handle item clicks
  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Hi 👋 {" " + yourName} </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.idLeague.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.strFanart1 }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.strLeague}</Text>
              <Text style={styles.cardDescription}>
                {item.strDescriptionFR}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 60,
    // marginTop: 10,
    backgroundColor: "#8a2851",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  floatingButton: {
    position: "absolute",
    bottom: 0,
    // right: 20,
    width: "100%",
    height: 60,

    backgroundColor: "#8a2851",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
