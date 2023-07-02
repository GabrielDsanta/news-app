import {
  Center,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";

import { useEffect, useState } from "react";
import { api } from "../service/api";
import { Loading } from "@components/Loading";
import { LatestNews } from "@components/Home/LatestNews";
import { Clock } from "phosphor-react-native";
import { formatDistanceToNow } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/tab.routes";
import NewsThumb from "@assets/newsPng.png";
import uuid from 'react-native-uuid'
import { HeaderList } from "@components/Home/HeaderList";
import { HeaderHome } from "@components/Home/HeaderHome";

export function Home() {
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [topHeadline, setTopHeadline] = useState<Article | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("business")
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenNews(url: string) {
    navigation.navigate("newsPage", { url: url });
  }

  useEffect(() => {
    setIsLoading(true)

    api.get(`/everything?q=${selectedCategory}`).then((response) => {
      setTopHeadline(response.data.articles[30]);
      setNews(response.data.articles);
      setIsLoading(false)
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (search !== "") {
      const filteredList = news.filter((item) => {
        return item.title.includes(search) || item.content.includes(search) || item.author.includes(search);
      });

      setFilteredNews(filteredList);
    } else {
      setFilteredNews([]);
    }
  }, [search]);

  return (
    <View px={6} flex={1}>
      <HeaderHome search={search} setSearch={setSearch} key={String(uuid.v4())} />

      <FlatList
        ListHeaderComponent={
          <>
            <HeaderList search={search} topHeadline={topHeadline} key={String(uuid.v4())} />
            <LatestNews selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} key={String(uuid.v4())} />
          </>
        }
        renderItem={({ item }) => !isLoading ? (
            <Pressable
              onPress={() => handleOpenNews(item.url)}
              mt={8}
              flexDirection="row">
              <Image
                alt=""
                rounded={4}
                width={24}
                height={24}
                source={item.urlToImage === null ? NewsThumb : { uri: item.urlToImage }}
              />

              <VStack maxW="250px" ml={2}>
                <Text fontFamily="mono" fontSize="14px" color="gray.500">
                  {item.author}
                </Text>
                <Text
                  numberOfLines={2}
                  fontFamily="mono"
                  color="black"
                  fontSize="16px">
                  {item.title}
                </Text>
                <HStack mt={1} alignItems="center">
                  <Clock color="#4E4B66" size={18} />
                  <Text
                    ml={1}
                    color="gray.500"
                    fontSize="15px"
                    fontFamily="body">
                    {formatDistanceToNow(new Date(item.publishedAt), {
                      addSuffix: true,
                    })}
                  </Text>
                </HStack>
              </VStack>
            </Pressable>
        
        ): (
          <Center flex={1} mt="20" mb="32">
            <Loading />
          </Center>
        )}
        data={filteredNews.length > 0 ? filteredNews : news}
        initialNumToRender={5}
        maxToRenderPerBatch={2}
        keyExtractor={(item) => item.content + uuid.v4()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={search.length === 0 ? (
          <View mt={6}>
            <Loading />
          </View>
        ): 
          <>
          </>
        }
      />
    </View>
  );
}
