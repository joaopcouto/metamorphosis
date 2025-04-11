import { useEffect, useState, useCallback } from "react";
import { View, FlatList, Button, Text, StyleSheet, Pressable, Image } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { getExperiments } from "../../storage/experimentStorage";

export default function HomeScreen() {
  const [experiments, setExperiments] = useState([]);

  const load = async () => {
    const data = await getExperiments();
    setExperiments(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, marginBottom: 50, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Text style={{ fontSize: 30, fontWeight: "bold"}}>Metamorphosis </Text>
      <View style={{ display: "flex", flexDirection: "row", gap: 20}}>
        <Link href="/experiments/new" asChild>
        <Pressable>
           <Image 
           source={require("../../assets/images/plus.png")}
           style={{ width: 35, height: 35}}
           /> 
        </Pressable>
        </Link>
        <Pressable>
          <Image
          source={require("../../assets/images/profile.png")}
          style={{ width: 35, height: 35}}
          />
        </Pressable>
        </View>
      </View>

      {experiments.length === 0 ? (
        <Text style={{ marginTop: 20, fontSize: 16 }}>
          Nenhum experimento criado ainda.
        </Text>
      ) : (
        <FlatList
          data={experiments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/experiments/${item.id}`} asChild>
              <Text style={styles.item}>{item.name}</Text>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
