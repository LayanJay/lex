import React, { useEffect, useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getUserById } from "../lib/queries/user";

dayjs.extend(relativeTime);

type Props = {
  visible: boolean;
  onClose: (newState: boolean) => void;
  onConfirm: () => void;
};

const PollConfirmModal = ({ visible, onClose, onConfirm }: Props) => {
  const tailwind = useTailwind();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to create this poll?
          </Text>
          <Button color="#000" title="Confirm" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PollConfirmModal;
