import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password)
      return Alert.alert(
        "Kesalahan",
        "Tolong lengkapi form yang masih kosong."
      );

    setIsSubmitting(true);

    try {
      await signIn({ email, password });

      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Masukkan alamat email anda"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Masukkan password anda"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Masuk" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center flex-row gap-2">
        <Text className="base-regular text-gray-100">Belum memiliki akun?</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Daftar
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
