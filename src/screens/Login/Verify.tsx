import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import * as Animatable from "react-native-animatable";

const CELL_COUNT = 6;

const VerificationCodeScreen = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const shakeRef = useRef<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerify = () => {
    if (value === "123456") {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // TODO: điều hướng đến trang chính:
        // navigation.navigate('Home');
      }, 3000);
    } else {
      setError(true);
      shakeRef.current?.shake(800); // lệnh shake
    }
  };

  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const maskedUser = user[0] + "***";
    const maskedDomain = domain[0] + "***" + domain.slice(domain.indexOf("."));
    return `${maskedUser}@${maskedDomain}`;
  };
  const userEmail = "abc123@gmail.com";

  const handleResend = () => {
    setValue("");
    setError(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Text style={styles.subtitle}>Verify your email</Text>
      <Text style={styles.message}>
        We sent a verification code to{" "}
        <Text style={styles.email}>{maskEmail(userEmail)}</Text>
      </Text>

      <Animatable.View ref={shakeRef}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={(text) => {
            setValue(text);
            setError(false); // reset lỗi khi nhập lại
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                error && styles.errorCell,
              ]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </Animatable.View>

      {error && <Text style={styles.errorText}>Not valid</Text>}

      <TouchableOpacity
        style={[
          styles.verifyButton,
          value.length !== 6 && styles.buttonDisabled,
        ]}
        onPress={handleVerify}
        disabled={value.length !== 6}
      >
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Don’t receive code?{" "}
        <Text style={styles.resendLink} onPress={handleResend}>
          Resend code
        </Text>
      </Text>
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../png/Verify.png")} // Thay ảnh bạn muốn
              style={styles.avatar}
            />
            <Text style={styles.successTitle}>Congratulations</Text>
            <Text style={styles.successMessage}>
              Your account is ready to use. You will be redirected to the Home
              Page in a few seconds.
            </Text>
            <ActivityIndicator color="#007bff" style={{ marginTop: 10 }} />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default VerificationCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  phone: {
    fontWeight: "600",
    color: "#000",
  },
  codeFieldRoot: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    width: 44,
    height: 56,
    lineHeight: 56,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  focusCell: {
    borderColor: "#3b82f6",
    backgroundColor: "#e0edff",
  },
  errorCell: {
    borderColor: "#ef4444",
    backgroundColor: "#ffe6e6",
  },
  cellText: {
    fontSize: 20,
    fontWeight: "500",
  },
  verifyButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "#ef4444",
    marginTop: -12,
    marginBottom: 8,
  },
  resendText: {
    marginTop: 20,
    fontSize: 13,
    color: "#666",
  },
  resendLink: {
    color: "#3b82f6",
    fontWeight: "500",
  },
  email: {
    fontWeight: "bold",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  successMessage: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
});
