import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import Icon2 from '@expo/vector-icons/MaterialCommunityIcons';
interface RepeatModeMenu {
  visible: boolean;
  onClose: () => void;
  onPair: () => void;
  onGuess: () => void;
  onRecall: () => void;
}

const RepeatModeMenu: React.FC<RepeatModeMenu> = ({ visible, onClose, onPair, onGuess, onRecall }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              {/* Pair */}
              <TouchableOpacity style={styles.option} onPress={onPair}>
                <Icon name="socks" size={33} color="gray" /> 
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Pair it</Text>
                </View>
              </TouchableOpacity>

              {/* Guess */}
              <TouchableOpacity style={styles.option} onPress={onGuess}>
                <Icon name="comments" size={30} color="gray" /> 
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Guess it</Text>
                </View>
              </TouchableOpacity>

              {/* Recall */}
              <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]} onPress={onRecall}>
                <Icon2 name="brain" size={35} color="gray" /> 
                <View style={styles.textContainer}>
                  <Text style={styles.optionText}>Recall it</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Làm mờ nền phía sau
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    width: "60%",
    borderRadius: 20,
    elevation: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    padding: 25,
    paddingLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    marginLeft: 40,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RepeatModeMenu;
