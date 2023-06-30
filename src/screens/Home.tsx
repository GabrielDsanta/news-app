import { HeaderHome } from "@components/Home/HeaderHome";
import { Text, VStack } from "native-base";
import { useState } from "react"
import { useEffect } from "react"
import { api } from "../service/api";
import { NewsCard } from "@components/NewsCard";
import { Loading } from "@components/Loading";

export function Home(){
    const [topHeadline, setTopHeadline] = useState<Article | null>(null)

    useEffect(() => {
        api.get('/everything?q=*')
        .then((response) => {
            setTopHeadline(response.data.articles[0])
        })
    }, [])

    return(
        <VStack px={6} flex={1}>
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
        </VStack>
    )
}