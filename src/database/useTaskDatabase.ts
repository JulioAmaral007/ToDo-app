import { useSQLiteContext } from 'expo-sqlite'

export type TaskDatabase = {
  id: number
  title: string
  checked: number
}

export function useTaskDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<TaskDatabase, 'id'>) {
    const statement = await database.prepareAsync(
      'INSERT INTO tasks (title, checked) VALUES ($title, $checked)'
    )

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $checked: data.checked,
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function getAll(id: number) {
    try {
      const query = 'SELECT * FROM tasks WHERE id = ?'

      const response = await database.getFirstAsync<TaskDatabase>(query, [id])

      return response
    } catch (error) {
      throw error
    }
  }

  async function get(id: number, checked: number) {
    try {
      const query = 'SELECT * FROM tasks WHERE id = ? AND checked = ?'

      const response = await database.getFirstAsync<TaskDatabase>(query, [
        id,
        checked,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(id: number, checked: boolean) {
    try {
      const checkedValue = checked ? 1 : 0
      const query = `UPDATE tasks SET checked = ${checkedValue} WHERE id = ${id}`

      await database.execAsync(query)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync('DELETE FROM tasks WHERE id = ' + id)
    } catch (error) {
      throw error
    }
  }

  async function show() {
    try {
      const query = 'SELECT * FROM tasks ORDER BY id DESC'

      const response = await database.getAllAsync<TaskDatabase>(query)

      return response
    } catch (error) {
      throw error
    }
  }

  return { create, getAll, get, update, remove, show }
}
