/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from "react";
import BudgetApp from "./src/budgetScreen";
import SplashScreen from "./src/splashScreen";
import { View } from "react-native";





function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 8000); // Simulate a delay for demonstration purposes
  }, []);
  return (
  <View style={{flex:1}}>
    {
      showSplash ? <SplashScreen/> :< BudgetApp/>

    }
  </View>
  );
}



export default App;
