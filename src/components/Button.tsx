import { Pressable, Text } from 'react-native'

type ButtonProps = {
  title: string
  onFilter?: () => void
  isActive?: boolean
}

export function Button({ title, onFilter, isActive }: ButtonProps) {
  return (
    <Pressable
      className={`${
        isActive ? 'bg-black' : 'bg-slate-300 '
      } items-center justify-center py-4 px-9 rounded-3xl`}
      onPress={onFilter}
    >
      <Text
        className={`${
          isActive ? 'text-white' : 'text-black'
        } font-bold text-lg`}
      >
        {title}
      </Text>
    </Pressable>
  )
}
