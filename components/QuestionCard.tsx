import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";
import { QuestionType } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
type Props = {
  data: QuestionType;
};
const QuestionCard = ({ data }: Props) => {
  const tailwind = useTailwind();
  const { id, title, createdAt, upvotes } = data;
  return (
    <View
      style={tailwind(
        "mb-2 bg-grey-lighter py-3 px-4 flex flex-row justify-around items-center"
      )}
    >
      <View style={tailwind("pl-1 pr-6 flex items-center")}>
        <AntDesign name="like2" size={24} color="black" />
        <Text style={tailwind("text-xs pt-1")}> {upvotes.length}</Text>
      </View>
      <Text style={tailwind("w-3/4")}>{title}</Text>

      <Text style={tailwind("px-1 text-xs ")}>
        {dayjs(createdAt.toDate()).format("mm")} min
      </Text>
    </View>
  );
};

export default QuestionCard;
