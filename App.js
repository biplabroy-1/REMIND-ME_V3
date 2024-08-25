import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import ParallaxScrollView from './Components/ParallaxScrollView';
import Sidebar from './Components/Sidebar';

export default function App() {
  const [classSchedule, setClassSchedule] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const Username = 'Biplab Roy';
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = new Date().getDay();
  const dayName = dayNames[day];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayName);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch('http://192.168.0.131:8000/schedule'); // Update IP address here
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClassSchedule(data);
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);


  return (
    <View className='flex-1 bg-[#A1CEDC]'>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <TouchableOpacity
        className='absolute top-8 left-5 z-50'
        onPress={() => setSidebarOpen(!sidebarOpen)}
      >
        <Text className='text-2xl font-bold'>☰</Text>
      </TouchableOpacity>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerContent={
          <View className="flex-1 px-2 mt-10">
            <Text className='font-semibold text-2xl text-center'>Hello {Username}</Text>
            <Text className='text-lg text-center'>Today is {dayName}</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#009688']}
            tintColor="#009688"
            title="Pull to refresh"
            titleColor="#009688"
          />
        }
      >
        <View className='h-[90vh]'>
          <View className='p-2 justify-evenly flex-row w-full sticky'>
            {dayNames.map((day) => (
              <Text key={day} onPress={() => setSelectedDay(day)}
                className={`my-2 mx-4 ${day === 'Sunday' || day === 'Saturday' ? 'text-red-500' : 'text-black'}  ${selectedDay === day ? 'border-b-2 border-blue-500' : ''
                  }`}
              >
                {day.slice(0, 3)}
              </Text>
            ))}
          </View>
          <ScrollView nestedScrollEnabled={true}>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </ScrollView>
        </View>
      </ParallaxScrollView >
      <StatusBar style='auto' />
    </View >
  );
}
