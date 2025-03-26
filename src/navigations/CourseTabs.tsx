import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingCourses from '../screens/Course/OngoingCourses';
import CompletedCourses from '../screens/Course/CompletedCourses';
import LockedCourses from '../screens/Course/LockedCourses';

const Tab = createMaterialTopTabNavigator();

export default function CourseTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', },
        tabBarIndicatorStyle: { backgroundColor: '#2563EB' },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#2E2E2E',
        
      }}
    >
      <Tab.Screen name="Learn more" component={LockedCourses} />
      <Tab.Screen name="Ongoing" component={OngoingCourses} />
      <Tab.Screen name="Completed" component={CompletedCourses} />
    </Tab.Navigator>
  );
}
