import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import Voice from '@react-native-voice/voice'
import { Entypo } from '@expo/vector-icons'
import KshirsaAiSpeaker from '../../../assets/animatedImage/KshirsaAiSpeaker'
const VoiceSpeaker = ({ toggleMic }) => {
    const [startRecording, setStartRecording] = useState(false)
    // useEffect(() => {
    //     if (!Voice._loaded) {
    //         console.error('Voice module is not loaded. Ensure native dependencies are linked and permissions are granted.');
    //     }
    //     Voice.onSpeechStart = onSpeechStart
    //     Voice.onSpeechEnd = onSpeechEnd
    //     Voice.onSpeechResults = onSpeechResult;

    //     return () => {
    //         Voice.destroy().then(Voice.removeAllListeners);
    //     }
    // }, [])
    // // console.log(Voice, 'Voice')
    // const onSpeechStart = (e) => {
    //     console.log('onSpeechStartHandler: ', e)
    // }

    // const onSpeechEnd = (e) => {
    //     console.log('onSpeechStartHandler: ', e)
    // }

    // const onSpeechResult = (e) => {
    //     console.log('onSpeechStartHandler: ', e)
    // }

    // const startRecognizing = async () => {
    //     setStartRecording(true)
    //     try {
    //         await Voice.start('en-US')
    //     } catch (e) {
    //         console.log('Error recognizing: ', e)
    //     }
    // }

    // const stopRecognizing = async () => {
    //     setStartRecording(false)
    //     try {
    //         await Voice.stop()
    //         await Voice.destroy()
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
return (
    <>
        {!startRecording ?
            <TouchableOpacity onPress={() => { toggleMic(); }}>
                <KshirsaAiSpeaker />
            </TouchableOpacity>
            : <TouchableOpacity onPress={() => { toggleMic(); }}>
                <Entypo name="cross" size={24} color="white" />
            </TouchableOpacity>
        }
    </>
)
}

export default VoiceSpeaker