import React from "react";
import { View, Text, Button } from "react-native";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    console.log(error?.message, ' error from boundary')
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>Something went wrong!</Text>
      <Text style={{ marginVertical: 10 }}>{error?.message}</Text>
      <Button title="Try Again" onPress={resetErrorBoundary} />
    </View>
  );
};

export default ErrorFallback;
