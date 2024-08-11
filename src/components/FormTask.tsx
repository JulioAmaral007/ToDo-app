import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

type FormTaskProps = {
  addTask: (title: string) => void
}

export function FormTask({ addTask }: FormTaskProps) {
  const [task, setTask] = useState('')

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      addTask(task.trim())
      setTask('')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-row absolute bottom-10 w-full justify-around items-center gap-6 px-6"
    >
      <TextInput
        className="bg-zinc-300 p-4 flex-1 shadow-xl shadow-black rounded-full text-black placeholder:text-black"
        placeholder="Digite a Tarefa..."
        value={task}
        onChangeText={(title) => setTask(title)}
      />
      <TouchableOpacity
        className="bg-zinc-300 py-4 px-5 shadow-xl shadow-black rounded-full"
        onPress={handleAddTask}
      >
        <View>
          <FontAwesome name="plus" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
