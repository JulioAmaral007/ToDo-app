import { Button } from '@/components/Button'
import { FormTask } from '@/components/FormTask'
import { TaskItem } from '@/components/TaskItem'
import { TaskDatabase, useTaskDatabase } from '@/database/useTaskDatabase'
import { useEffect, useState } from 'react'
import { FlatList, Text, View, ViewToken } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TaskDatabase[]>([])
  const [tab, setTab] = useState<'All' | 'Todo' | 'Finished'>('All')
  const viewableItems = useSharedValue<ViewToken[]>([])
  const taskDatabase = useTaskDatabase()

  async function show() {
    try {
      const response = await taskDatabase.show()
      setTasks(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    show()
  }, [])

  async function handleAddTask(title: string) {
    try {
      await taskDatabase.create({
        title,
        checked: 0,
      })
      show()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteTask(taskId: number) {
    try {
      await taskDatabase.remove(taskId)
      show()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCompleteTask(taskId: number) {
    try {
      const task = await taskDatabase.getAll(taskId)
      if (task) {
        const newCheckedState = !task.checked
        await taskDatabase.update(taskId, newCheckedState)
        show()
      } else {
        console.error(`Task with ID ${taskId} not found`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const isChecked = task.checked == 1

    if (tab === 'Todo') {
      return !isChecked
    }
    if (tab === 'Finished') {
      return isChecked
    }
    return true
  })

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#E8EAED',
        flex: 1,
      }}
    >
      <View className="flex-1 px-6">
        <View className="pt-24 mb-10">
          <Text className="text-5xl font-bold">Lista de Tarefas</Text>

          <View className="flex-row mt-5 justify-around">
            <Button
              title="Todos"
              onFilter={() => setTab('All')}
              isActive={tab === 'All'}
            />
            <Button
              title="Á Fazer"
              onFilter={() => setTab('Todo')}
              isActive={tab === 'Todo'}
            />
            <Button
              title="Finalizados"
              onFilter={() => setTab('Finished')}
              isActive={tab === 'Finished'}
            />
          </View>
        </View>

        <FlatList
          data={filteredTasks}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems
          }}
          renderItem={({ item }) => (
            <TaskItem
              onDelete={() => handleDeleteTask(item.id)}
              onComplete={() => handleCompleteTask(item.id)}
              item={item}
              viewableItems={viewableItems}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <FormTask addTask={handleAddTask} />
    </SafeAreaView>
  )
}
