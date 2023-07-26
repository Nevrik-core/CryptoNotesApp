import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";



export default function Feed() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="ADD Note"/>,
    });
  }, []);

    return (
        <SafeAreaView>
            <Text>Feed some text</Text>
        </SafeAreaView>
    )
}