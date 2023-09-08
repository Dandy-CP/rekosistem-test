import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "@/components/Stack/AuthStack";
import useAuth from "./hooks/useAuth";
import AppStack from "./components/Stack/AppStack";
import LoadingOverlay from "./components/elements/LoadingOverlay";

const Root = () => {
  const { authData, loading, isAuth } = useAuth();

  useEffect(() => {
    isAuth();
  }, []);

  if (loading) {
    return <LoadingOverlay isShown />;
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Root;
