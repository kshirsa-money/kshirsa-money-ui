import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import registrationStyles from '../../styles/stylesRegistration'
import KshirsaInput from '../../small-components/KshirsaInput'
import { FontAwesome6 } from '@expo/vector-icons'
import Colors from '../../styles/Colors'
import cssUtils from '../../constants/cssUtils'
import { use } from 'react'

const TransactionTags = ({formData, setFormData}) => {
    const initialTags = formData.tags ? formData.tags : [];
    const [tags, setTags] = useState(initialTags);
    const [inputValue, setInputValue] = useState('');
    console.log(formData?.tags, 'tags');

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            tags: tags,
        }));
    }, [tags]);

    useEffect(() => {
        if(formData.tags) {
            setTags(formData.tags || []);
        }
    },
    [formData.tags]);
    
    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleKeyPress = () => {
        // console.log(nativeEvent, 'hellow');
        // if (nativeEvent.key === 'Enter' && inputValue.trim()) {
            setTags([...tags, inputValue]);
            setInputValue('');
        // }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.tagsContainer}>
            <KshirsaInput
                style={styles.inputContainer}
                placeholder="Add Tags"
                value={inputValue}
                type='tags'
                name='tags'
                onChangeText={handleInputChange}
                onSubmitEditing={handleKeyPress}
                isValid={true}
                icon={<FontAwesome6 name="hashtag" size={24} color={Colors.white} />}
            />
             {tags?.length > 0 &&
             <View style={styles.tagsList}>
                {tags?.map((tag, index) => (
                <TouchableOpacity onPress={() => removeTag(index)}>
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                    </TouchableOpacity>
                ))}
            </View>}
        </View>
    )
}

export default TransactionTags

const styles = StyleSheet.create({
    tagsContainer: {
        width: '93%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: Colors.transactionCardBg,
        // borderRadius: 15,
        // paddingHorizontal: 10,
        paddingVertical: 5,
        // marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        color: Colors.white,
        backgroundColor: Colors.secondary,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginRight: 5,
        fontStyle: 'italic',
        fontWeight: cssUtils.mediumBold,
        fontSize: cssUtils.smallTextSize,
    },
    inputContainer: {
        backgroundColor: Colors.generalCardBg,
        width: '100%',
    }
})