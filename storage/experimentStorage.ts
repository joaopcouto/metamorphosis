import AsyncStorage from '@react-native-async-storage/async-storage';

export const getExperiments = async () => {
  const data = await AsyncStorage.getItem('experiments');
  return data ? JSON.parse(data) : [];
};

export const saveExperiment = async (experiment: any) => {
  const experiments = await getExperiments();
  experiments.push(experiment);
  await AsyncStorage.setItem('experiments', JSON.stringify(experiments));
};

export const saveAllExperiments = async (experiments: any[]) => {
  await AsyncStorage.setItem('experiments', JSON.stringify(experiments));
};