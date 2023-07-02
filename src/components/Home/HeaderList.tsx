import { Loading } from "@components/Loading";
import { NewsCard } from "@components/NewsCard";
import { Text, View } from "native-base";

interface HeaderList {
  search: string;
  topHeadline: Article | null;
}

export function HeaderList({ search, topHeadline }: HeaderList) {
  return (
    <View>
      {search === "" ? (
        <View>
          <Text
            color="black"
            fontFamily="heading"
            mt={6}
            mb={2}
            fontSize="16px">
            Trending
          </Text>

          {topHeadline === null ? (
            <Loading />
          ) : (
            <NewsCard
              url={topHeadline!.url}
              author={topHeadline!.author}
              imageUrl={topHeadline!.urlToImage!}
              createdAt={topHeadline!.publishedAt!}
              owner={topHeadline!.source.name}
              title={topHeadline!.title}
            />
          )}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
