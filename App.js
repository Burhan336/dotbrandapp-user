import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey="pk_test_51OSQYeGwHkul6KUrPCKVg9521SN0X2e9T46lSltPSGjY0MIio7vuR2Wpoyaxts8uErNGvMMICsCJpABsMYIMLPTI00UVMuGza6">
        <AppNavigator />
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
