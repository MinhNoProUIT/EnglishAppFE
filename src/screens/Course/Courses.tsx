import React from 'react';
import { View, Text } from 'react-native';
import CourseTabs from '../../navigations/CourseTabs';

export default function Courses() {
  return (
    <View style={{ flex: 1, marginBottom: 75, backgroundColor: '#fff', }}>
      <View style={{ marginTop: 40, height: 55, justifyContent: 'center', alignItems: 'center', }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#263038' }}>Courses</Text>
      </View>
      <CourseTabs />
    </View>
  );
}
