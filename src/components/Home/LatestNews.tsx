import { FlatList, Pressable, Text, View } from "native-base";
import { FilterList } from "../../data/FilterList";
import uuid from "react-native-uuid"

interface LatestNewsProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export function LatestNews({ setSelectedCategory, selectedCategory }: LatestNewsProps){

    function handleSelectCategory(categoryName: string) {
        const category = selectedCategory === categoryName ? '' : categoryName
        setSelectedCategory(category)
    }    

    return(
        <View>
            <Text color="black" fontFamily="heading" mt={6} mb={2} fontSize="16px">Latest</Text>

            <FlatList
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handleSelectCategory(item.category)} 
                        borderBottomColor={selectedCategory === item.category ? "blue.700" : ""}
                        borderBottomWidth={selectedCategory === item.category ? 1 : 0}
                        pb={1}
                    >
                        <Text fontFamily="mono" fontSize="17px" color={selectedCategory === item.category ? "black" : "gray.500"}>{item.category}</Text>
                    </Pressable>
                )}
                keyExtractor={(item) => String(item.id) + uuid.v4()}
                data={FilterList}
                ItemSeparatorComponent={() => (
                    <View ml={4}>
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}