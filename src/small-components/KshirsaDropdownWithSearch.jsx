import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../styles/Colors'
import KshirsaSearchIconAnimated from '../../assets/animatedImage/KshirsaSearchIconAnimation'
import { AntDesign } from '@expo/vector-icons'
import cssUtils from '../constants/cssUtils'
import KshirsaModal from './KshirsaModal'

const KshirsaDropdownWithSearch = ({ name = 'dropdown', data = [], singleSelection = false, selectedItems = [], setSelectedItems = () => {} }) => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState(data || [])
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        if (searchText === '') {
            setSearchResults([...data]) 
        } else {
            const filteredResults = data.filter(item =>
                item.toLowerCase().includes(searchText.toLowerCase())
            )
            setSearchResults(filteredResults)
        }
    }, [searchText, data])

    const handleSelection = (item) => {
        if (singleSelection) {
            setSelectedItems([item]) 
            setShowResults(false) 
        } else {
            setSelectedItems(prevSelected => {
                if (prevSelected.includes(item)) {
                    return prevSelected.filter(i => i !== item) // Deselect if already selected
                } else {
                    return [...prevSelected, item] // Select the item
                }
            })
        }
    }

    // Sort the search results, bringing selected items to the top
    const sortedResults = [...searchResults].sort((a, b) => {
        if (selectedItems.includes(a) && !selectedItems.includes(b)) return -1
        if (!selectedItems.includes(a) && selectedItems.includes(b)) return 1
        return 0
    })

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => setShowResults(!showResults)}>
                <View style={{ flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={styles.text}>{name}</Text>
                    {!singleSelection && selectedItems.length > 0 && (
                        <Text style={styles.selectedItemsMultiple}>
                            {selectedItems.join(', ')}
                        </Text>
                    )}
                </View>
                <View>
                    <AntDesign name="caretdown" size={18} color={Colors.white} />
                </View>
            </TouchableOpacity>

            <KshirsaModal isVisible={showResults} onClose={() => setShowResults(false)} header={name} isFooterNeeded={false}>
                <View style={[styles.expandedContainer]}>
                    <View style={styles.searchInputWrapper}>
                        <KshirsaSearchIconAnimated />
                        <TextInput
                            style={styles.searchInput}
                            onChangeText={text => setSearchText(text)}
                            value={searchText}
                            placeholder="Search..."
                            placeholderTextColor={Colors.white}
                        />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                            {sortedResults?.map((result, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.searchResultElement,
                                        selectedItems.includes(result) && styles.selectedItem
                                    ]}
                                    onPress={() => handleSelection(result)}
                                >
                                    <Text
                                        style={{
                                            color: selectedItems.includes(result) ? Colors.selectedText : Colors.white
                                        }}
                                    >
                                        {result}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </KshirsaModal>
        </>
    )
}

export default KshirsaDropdownWithSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
    },
    text: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
        fontWeight: 'bold',
        flex: 1,
    },
    selectedItemsMultiple: {
        color: Colors.secondary,
    },
    expandedContainer: {
        height: 250,
        padding: 10,
        borderRadius: 10,
    },
    searchInput: {
        height: 40,
        color: Colors.white,
        borderRadius: 50,
        width: '90%',
    },
    searchInputWrapper: {
        flexDirection: 'row',
        backgroundColor: Colors.moodyBlack,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
    },
    scrollView: {
        flex: 1,
    },
    searchResultElement: {
        padding: 10,
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
    },
    selectedItem: {
        backgroundColor: Colors.secondary, // Add a different background color for selected items
    },
})