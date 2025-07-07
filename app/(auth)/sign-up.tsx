import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>signUp</Text>
      <Button title="Sign In" onPress={() => router.push("/sign-in")} />
    </View>
  );
};

export default SignUp;
