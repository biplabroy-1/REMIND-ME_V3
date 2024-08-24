import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import ParallaxScrollView from './Components/ParallaxScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatAMPM } from './Date';
export default function App() {
  const Username = 'John Doe';
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = new Date().getDay();
  const dayName = dayNames[day];
  const [currentTime, setCurrentTime] = useState(formatAMPM(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatAMPM(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  console.log(currentTime);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerContent={
          <View className="flex-1 px-2 mt-6">
            <Text className='font-semibold text-2xl text-center '>Hello {Username}</Text>
            <Text className='text-lg text-center'>Today is {dayName}</Text>
          </View>
        }>
        <View className='h-screen'>
          <View className='justify-evenly flex-row py-4 w-full'>
            {dayNames.map((day, index) => {
              return (
                <Text className='border-b text-lg font-semibold' key={index}>{day.slice(0, 3)}</Text>
              )
            })}
          </View>
          <View>
            <Text>Hello</Text>
          </View>
        </View>
      </ParallaxScrollView>
      <StatusBar style='auto' />
    </SafeAreaView>

  );
}
