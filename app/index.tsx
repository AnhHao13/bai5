import React, { useState } from "react";
import { CheckBox, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { products } from "./api/products";

export default function Index() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [results, setResults] = useState(products); // Hiển thị toàn bộ sản phẩm ban đầu

  const categories = ["Electronics", "Fashion", "Accessories"]; // Danh mục cố định

  const handleSearch = () => {
    const filteredProducts = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesQuery && matchesCategory;
    });
    setResults(filteredProducts);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Bỏ chọn nếu đã chọn
        : [...prev, category] // Thêm vào nếu chưa chọn
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.checkboxContainer}>
        {categories.map((category) => (
          <View key={category} style={styles.checkboxItem}>
            <CheckBox
              value={selectedCategories.includes(category)}
              onValueChange={() => toggleCategory(category)}
            />
            <Text> {category}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.button} onPress={handleSearch}>
        Search
      </Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.category} - ${item.price}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  button: {
    color: "blue",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});