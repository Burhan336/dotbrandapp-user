import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey="pk_test_51NqDB7FUtqiloGGLtEWyVRgvWcwHw3JV21EB9FRIudrkCSPMCiJJRAImyKuZ45dcGpy3N6ZYkNBgpBiORto2IrA900R4CNW06K">
        <AppNavigator />
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
