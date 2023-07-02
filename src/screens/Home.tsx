import {
  Center,
  FlatList,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";

import { useEffect, useState } from "react";
import { api } from "../service/api";
import { Loading } from "@components/Loading";
import { LatestNews } from "@components/Home/LatestNews";
import { Clock, MagnifyingGlass } from "phosphor-react-native";
import { formatDistanceToNow } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/tab.routes";
import Logo from "@assets/Logo.svg";
import NewsThumb from "@assets/newsPng.png";
import uuid from 'react-native-uuid'
import { HeaderList } from "@components/Home/HeaderList";

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
      <VStack mt={16}>
        <Logo height={30} width={100} />

        <HStack
          h={12}
          mt={10}
          rounded={6}
          px={2}
          borderWidth="1"
          borderColor="gray.500"
          alignItems="center">
          <MagnifyingGlass color="#4E4B66" size={20} />
          <Input
            value={search}
            onChangeText={setSearch}
            mt={1}
            borderWidth="0"
            bg="transparent"
            placeholder="Search"
            _focus={{
              bg: "transparent",
            }}
          />
        </HStack>
      </VStack>

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
