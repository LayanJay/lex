import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { AnswerType } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getUserById } from "../lib/queries/user";

dayjs.extend(relativeTime);

type Props = {
  data: AnswerType;
};

const AnswerCard = ({ data }: Props) => {
  const tailwind = useTailwind();
  const { id, questionId, answer, createdAt, createdBy } = data;
  const [createdUser, setCreatedUser] = useState<any>();

  useEffect(() => {
    const getUserDetails = async (id: string) => {
      const res = await getUserById(id);
      setCreatedUser(res);
    };
    getUserDetails(createdBy);
  }, [createdBy]);

  return (
    <View style={tailwind("pt-2 pb-3 border-b border-grey-light")}>
      <Text style={tailwind("text-grey-darker")}>{answer}</Text>
      <View style={tailwind("flex flex-row pt-2")}>
        <Text style={tailwind("text-grey-main text-xs")}>
          {dayjs(createdAt.toDate()).fromNow()}
        </Text>
        {createdUser && (
          <Text style={tailwind("text-grey-dark font-semibold text-xs")}>
            {" "}
            by {createdUser.firstname + createdUser.lastname}{" "}
          </Text>
        )}
      </View>
    </View>
  );
};

export default AnswerCard;
