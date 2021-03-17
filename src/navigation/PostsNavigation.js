import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { THEME } from "../theme";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import AppHeaderIconButton from "../components/AppHeaderIcon";
import { toggleBooked } from "../store/actions/post-actions";
import { useEffect } from "react/cjs/react.development";

const Stack = createStackNavigator();

export const PostsNavigation = () => {
  const dispatch = useDispatch();
  const MainScrHeaderRight = () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIconButton}>
      <Item name="Take a photo" iconName="camera" />
    </HeaderButtons>
  );

  const MainScrHeaderLeft = (navigation) => {
    return (
      <HeaderButtons HeaderButtonComponent={AppHeaderIconButton}>
        <Item name="Toggle drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
      </HeaderButtons>
    );
  };

  const PostRight = (postId, booked) => {
    let currentBooked = booked;
    const bookedPosts = useSelector((state) => state.posts.bookedPosts);
    currentBooked = bookedPosts.find((p) => p.id === postId);

    const bookedHandler = () => dispatch(toggleBooked(postId));
    return (
      <HeaderButtons HeaderButtonComponent={AppHeaderIconButton}>
        <Item name="Toggle drawer" iconName={currentBooked ? "ios-star" : "ios-star-outline"} onPress={bookedHandler} />
      </HeaderButtons>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="AllPosts"
        component={MainScreen}
        options={({ navigation }) => ({
          title: "My Blog",
          headerRight: MainScrHeaderRight,
          headerLeft: () => MainScrHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({
          title: `Post ${route.params.postId} от ${new Date(route.params.date).toLocaleDateString()}`,
          headerRight: () => {
            return PostRight(route.params.postId, route.params.booked);
          },
        })}
      />
    </Stack.Navigator>
  );
};
