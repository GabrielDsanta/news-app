import { HeaderHome } from "@components/Home/HeaderHome";
import { FlatList, Pressable, Text, View } from "native-base";
import { useState } from "react"
import { useEffect } from "react"
import { api } from "../service/api";
import { NewsCard } from "@components/NewsCard";
import { Loading } from "@components/Loading";
import { LatestNews } from "@components/Home/LatestNews";

export function Home(){
    const [news, setNews] = useState<Article[]>([])
    const [topHeadline, setTopHeadline] = useState<Article | null>(null)

    useEffect(() => {
        api.get('/everything?q=*')
        .then((response) => {
            setTopHeadline(response.data.articles[0])
            setNews(response.data.articles)
        })
    }, [])

    return(
        <View px={6} flex={1}>

            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <HeaderHome />

                        <Text color="black" fontFamily="heading" mt={6} mb={2} fontSize="16px">Trending</Text>

                        {topHeadline === null ? (
                            <Loading />
                        ): (
                            <NewsCard 
                                url={topHeadline!.url}
                                author={topHeadline!.author}
                                imageUrl={topHeadline!.urlToImage!} 
                                createdAt={topHeadline!.publishedAt!} 
                                owner={topHeadline!.source.name}
                                title={topHeadline!.title}
                                key={topHeadline!.source.id}
                            />
                        )}

                        <LatestNews />
                    </>
                )}
                renderItem={({ item }) => (
                    <Pressable>

                    </Pressable>
                )}
                data={news}
                keyExtractor={(item) => item.content}
                showsVerticalScrollIndicator={false}
            />
           
        </View>
    )
}