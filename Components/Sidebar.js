// Components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { formatAMPM } from './Utils/Date';

const Sidebar = ({ isOpen, onClose }) => {
    const [currentTime, setCurrentTime] = useState(formatAMPM(new Date()));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(formatAMPM(new Date()));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <View className='h-screen absolute top-0 left-0 w-4/5 p-14 pl-5 z-50 bg-slate-500 '>
            <View className='mt-4 flex-1 items-center bg-slate-200'>
                <Text className='text-3xl text-center border-b-2'>{currentTime}</Text>
                <Text className='text-base my-2'>Option 2</Text>
                <Text className='text-base my-2'>Option 3</Text>
            </View>
        </View>
    );
};

export default Sidebar;
