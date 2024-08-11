import { Ionicons } from '@expo/vector-icons'
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

type TaskItemProps = {
  item: { id: number; title: string; checked: number }
  viewableItems: Animated.SharedValue<ViewToken[]>
  onDelete: () => void
  onComplete: () => void
}

export function TaskItem({
  item,
  onDelete,
  onComplete,
  viewableItems,
}: TaskItemProps) {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value.some(
      (viewableItem) =>
        viewableItem.isViewable && viewableItem.item.id === item.id
    )

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    }
  }, [viewableItems.value])

  const checked = item.checked == 1 ? true : false

  return (
    <Animated.View
      className="bg-zinc-50 p-4 rounded-xl flex-row items-center justify-between mb-6"
      style={rStyle}
    >
      <View className="flex-row items-center gap-5">
        <Pressable
          className={`${
            checked ? 'bg-black' : 'bg-transparent'
          } w-6 h-6 border-2 rounded-xl justify-center items-center`}
          onPress={onComplete}
        >
          {checked && <Ionicons name="checkmark" size={14} color="white" />}
        </Pressable>

        <Text className="text-xl text-start">{item.title}</Text>
      </View>

      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </Animated.View>
  )
}
