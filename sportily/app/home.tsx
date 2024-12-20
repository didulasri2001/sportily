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

  // Fetch sports-related products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=France"
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi 👋 {" " + yourName} </Text>
      </View>

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

      <TouchableOpacity style={styles.countButton}>
        <Text style={styles.countButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,

    backgroundColor: "#8a2851",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "#c93673",
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
    color: "#fff",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  countButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#8a2851",
    justifyContent: "center",
    alignItems: "center",
  },
  countButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
