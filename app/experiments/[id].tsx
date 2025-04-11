import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Switch } from 'react-native';
import { getExperiments, saveAllExperiments } from '../../storage/experimentStorage';

export default function ExperimentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [experiment, setExperiment] = useState<any>(null);

  useEffect(() => {
    loadExperiment();
  }, []);

  const loadExperiment = async () => {
    const experiments = await getExperiments();
    const found = experiments.find((exp: any) => exp.id === id);
    setExperiment(found);
  };

  const toggleDay = async (day: number) => {
    if (!experiment) return;

    const alreadyChecked = experiment.progress.includes(day);
    const updatedProgress = alreadyChecked
      ? experiment.progress.filter((d: number) => d !== day)
      : [...experiment.progress, day];

    const updatedExperiment = { ...experiment, progress: updatedProgress };
    setExperiment(updatedExperiment);

    // salvar no storage
    const experiments = await getExperiments();
    const updatedList = experiments.map((exp: any) =>
      exp.id === experiment.id ? updatedExperiment : exp
    );
    await saveAllExperiments(updatedList);
  };

  if (!experiment) return <Text>Carregando...</Text>;

  const days = Array.from({ length: experiment.duration }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{experiment.name}</Text>
      <FlatList
        data={days}
        keyExtractor={(day) => day.toString()}
        renderItem={({ item: day }) => (
          <View style={styles.dayItem}>
            <Text style={{ fontSize: 16 }}>Dia {day}</Text>
            <Switch
              value={experiment.progress.includes(day)}
              onValueChange={() => toggleDay(day)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});