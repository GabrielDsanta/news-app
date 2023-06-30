import { FlatList, Pressable, Text, View } from "native-base";
import { FilterList } from "../../data/FilterList";
import { useState } from "react";

export function LatestNews(){
    const [selectedCategory, setSelectedCategory] = useState("business")

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
                        onPress={() => handleSelectCategory(item)} 
                        borderBottomColor={selectedCategory === item ? "blue.700" : ""}
                        borderBottomWidth={selectedCategory === item ? 1 : 0}
                        pb={1}
                    >
                        <Text fontFamily="mono" fontSize="17px" color={selectedCategory === item ? "black" : "gray.500"}>{item}</Text>
                    </Pressable>
                )}
                data={FilterList}
                ItemSeparatorComponent={() => (
                    <View ml={4}>
                    </View>
                )}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}