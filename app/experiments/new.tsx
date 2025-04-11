import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity, Platform, ActionSheetIOS, KeyboardAvoidingView, ScrollView } from 'react-native';
import { saveExperiment } from '../../storage/experimentStorage';
import Calendar from '@/components/ui/Calendar';
import { DateType } from 'react-native-ui-datepicker';
import { Picker } from '@react-native-picker/picker';

export default function NewExperimentScreen() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calendar, setCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateType>(new Date());
  const [selectedOption, setSelectedOption] = useState('option1');
  const router = useRouter();

  console.log(selectedDate);
  console.log(selectedOption);

  const openCalendarView = () => {
    setCalendar(true);
    calendar === true ? setCalendar(false) : setCalendar(true);
  }

  const showIOSPicker = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancelar', 'Diariamente', 'Semanalmente', ' Mensalmente'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) 
          setSelectedOption('Diariamente');
        
        if (buttonIndex === 2) 
          setSelectedOption('Semanalmente');
        if (buttonIndex === 3)
          setSelectedOption('Mensalmente');
      }
    );
  };

  const create = async () => {
    if (!name || !duration) return;

    const newExperiment = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      startDate: selectedDate,
      progress: [],
    };

    await saveExperiment(newExperiment);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>NOME</Text>
      <TextInput placeholder="Nome do experimento" onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>HIPÓTESE</Text>
      <TextInput placeholder="O que você espera que aconteça?" onChangeText={setName} style={styles.input} />

      <View style={{ marginTop: 150}}>
          <Text style={styles.label}>DETALHES</Text>

        <TouchableOpacity onPress={openCalendarView} style={{ marginTop: 20, marginBottom: 20 }}>
          <Text >Data inicial</Text>
          
        </TouchableOpacity> 

          {calendar && (
            <Calendar selected={selectedDate} setSelected={setSelectedDate} />
          )}




{Platform.OS === 'ios' ? (
            <>
              <TouchableOpacity onPress={showIOSPicker} style={{ marginBottom: 10 }}>
                <Text>Frequência: {selectedOption} </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text>Frequência</Text>
              <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => setSelectedOption(itemValue)}
                style={{ marginBottom: 10 }}
              >
                <Picker.Item label="Diariamente" value="Diariamente" />
                <Picker.Item label="Semanalmente" value="Semanalmente" />
                <Picker.Item label="Mensalmente" value="Mensalmente" />
              </Picker>
            </>
          )}

          <TextInput placeholder="Duração em dias" keyboardType="numeric" onChangeText={setDuration} style={styles.input} />

                    
          



        <Button title="Criar" onPress={create} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
  label: { fontSize: 12, color: '#666'},
});