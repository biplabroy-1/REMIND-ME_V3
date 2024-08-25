import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from './Components/ParallaxScrollView';
import Sidebar from './Components/Sidebar';



export default function App() {
  const [classSchedule, setclassSchedule] = useState({})
  const Username = 'Biplab Roy';
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = new Date().getDay();
  const dayName = dayNames[day];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayName);

  // Check if classSchedule has any properties
  if (Object.keys(classSchedule).length == 0) {
    setclassSchedule({
      New_Time: '100 AM - 11:00 AM',
      Class_type: 'Lab',
      Course_Name: 'CSE 101',
      Group: 'All',
      Instructor: 'Dr. John Doe',
      Building: '1',
      Room: '101'
    })
  }



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
        }>
        <View className='min-h-[90vh]'>
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
          <View className='flex-1 items-center'>
            <View className={`relative mb-4 p-4 border-[1.5px] rounded-xl ${classSchedule.Class_type === 'Free' ? 'border-red-300 bg-red-50' : (classSchedule.Class_type === 'Lab' ? 'border-blue-300 bg-blue-50' : 'border-green-300 bg-green-50')}`}>
              <View className='flex-row justify-between items-center'>
                <Text className="text-xs font-medium">Time: {classSchedule.New_Time}</Text>
                <View className={`${classSchedule.Class_type === 'Free' ? 'bg-red-700' : (classSchedule.Class_type === 'Lab' ? 'bg-blue-700' : 'bg-green-700')} rounded-full px-3 py-1`}>
                  <Text className='text-white font-bold text-xs'>{classSchedule.Class_type}</Text>
                </View>
              </View>
              <Text className="text-lg font-bold text-slate-900">{classSchedule.Course_Name}</Text>
              <Text className={`text-lg font-bold text-stone-800 ${classSchedule.Class_type === 'Free' ? 'hidden' : ''}`}>
                {classSchedule.Group === 'All' ? 'All Group' : classSchedule.Group}
              </Text>
              <View className="flex-row mt-2 justify-between items-center mb-2.5">
                <View>
                  <Text className={`text-xs w-48 ${classSchedule.Class_type === 'Free' ? 'hidden' : ''}`}>Instructor: {classSchedule.Instructor}</Text>
                </View>
                <Text className={`${classSchedule.Class_type === 'Free' ? 'hidden' : ''}`}>UB {classSchedule.Building} : {classSchedule.Room}</Text>
              </View>
            </View>
          </View>
        </View>
      </ParallaxScrollView >
      <StatusBar style='auto' />
    </View >
  );
}
