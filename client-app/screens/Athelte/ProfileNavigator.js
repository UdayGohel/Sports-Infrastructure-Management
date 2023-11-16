import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import PaymentHistory from "./PaymentHistory";
import Complaint from "./Complaint";
import SportComplexDetail from "./SportComplexDetail";
import SportEnroll from "./SportEnroll";
import ListComplaint from "./ListComplaint";
import ViewComplaint from "./ViewComplaint";
import IDCard from "./IDCard";
import AthleteResponse from "./AthelteResponse";
import LeaderBoard from "./LeaderBoard";
import SatisfiedResponse from "./SatisfiedResponse";
const ProfileNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="MainProfile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailProfile"
          component={ProfileDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthelteComplaint"
          component={Complaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportsComplexDetails"
          component={SportComplexDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportEnroll"
          component={SportEnroll}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplaintList"
          component={ListComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplaintView"
          component={ViewComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IDCard"
          // component={IDCard}
          component={SatisfiedResponse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExitForm"
          component={AthleteResponse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
