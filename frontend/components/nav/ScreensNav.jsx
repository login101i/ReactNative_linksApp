import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, SignIn, Home, Account, Links, ForgotPassword, PostLink, LinkView, Profile, TrendingLinks } from '../../screens';
import { AuthContext } from '../../context/auth';
import { HeaderTabs } from '../../components/nav';

function ScreensNav() {
  const [state, useState] = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  const authenticated = state && state.token !== '' && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Links Daily',
              headerRight: () => <HeaderTabs />
            }}
          />
          <Stack.Screen
            name="Home2"
            component={Home}
            options={{
              title: 'Links Daily',
              headerRight: () => <HeaderTabs />
            }}
          />
          <Stack.Screen name="Account" component={Account} options={{ headerBackTitle: 'Back' }} />
          <Stack.Screen
            name="PostLink"
            component={PostLink}
            options={{
              title: 'Post',
              headerRight: () => <HeaderTabs />
            }}
          />
          <Stack.Screen name="Links" component={Links} />
          <Stack.Screen name="LinkView" component={LinkView} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => ({
              title: route.params?.name || '',
              headerTransparent: true,
              headerBackTitle: ''
            })}
          />

          <Stack.Screen
            name="TrendingLinks"
            component={TrendingLinks}
            options={() => ({
              headerTransparent: true,
              headerBackTitle: ''
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: false
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default ScreensNav;
