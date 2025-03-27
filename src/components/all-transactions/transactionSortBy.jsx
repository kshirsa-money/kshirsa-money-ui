import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import KshirsaPopup from '../../small-components/KshirsaPopup'
import { TransactionSortByToMap } from '../../constants/utils'
import { useRouter } from 'expo-router'
import uiRoutes from '../../constants/uiRoutes'
import Colors from '../../styles/Colors'

const TransactionSortBy = ({visibleSortPopup, setVisibleSortPopup, filterParams, sortByForm, setSortByForm}) => {
    const router = useRouter()
    const onClose = () => {
        setVisibleSortPopup(false)
    }

    const handleClickSort = (item) => {
        setSortByForm(item.value)
        setVisibleSortPopup(false)
        router.replace({
            pathname: uiRoutes.allTransactions,
            params: {
                ...filterParams,
                sortBy: item.value
            }
        })
    }

    return (
   <KshirsaPopup visible={visibleSortPopup} onClose={onClose} header="Sort By" popupHeight={300}>
    <View style={{paddingHorizontal: 20}}>
        {TransactionSortByToMap.map((item, index) => (
            <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} onPress={() => handleClickSort(item)}>
                <Text style={sortByForm === item.value ? {color: Colors.secondary} : {color: Colors.white} }>{item.label}</Text>
            </TouchableOpacity>
        ))}
    </View>
    </KshirsaPopup>
  )
}

export default TransactionSortBy