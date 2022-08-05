/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import "./ignoreWarnings"
import "react-native-gesture-handler"
import "react-native-reanimated"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Main from "./src/navigation/Main"


const App: React.FunctionComponent = (): JSX.Element => {

  return (
    <NavigationContainer>
      <Main
        Connection={undefined}
        Registration={undefined}
        Welcome={{
          email: "",
          userID: ""
        }}
        Help={undefined}
        MainDrawer={{
          screen: undefined,
          params: undefined,
          initial: undefined,
          path: undefined,
          state: undefined
        }} />
    </NavigationContainer>
  )
}

export default App;
