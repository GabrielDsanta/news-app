import { HStack, Image, Pressable, Text } from "native-base";
import { Clock } from 'phosphor-react-native'
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface NewsCardProps {
    imageUrl: string;
    title: string;
    createdAt: string;
    owner: string;
    author: string;
    url: string;
}

export function NewsCard({ createdAt, imageUrl, owner, title, author, url }: NewsCardProps){
    
    function handleOpenNews(){
        
    }

    return(
        <Pressable onPress={handleOpenNews}>
            <Image rounded={4} source={{ uri: imageUrl }} alt="" w="364px" h="183px" />

            <Text color="gray.500" fontSize="16px" fontFamily="mono" mb={3} mt={2}>{owner}</Text>
            <Text color="black" fontSize="16px" fontFamily="body">{title}</Text>

            <HStack mt={1} alignItems="center">
                <Text mr={4} color="gray.500" fontSize="16px" fontFamily="heading">{author}</Text>
                <Clock color="#4E4B66" size={18}  />
                <Text ml={1} color="gray.500" fontSize="15px" fontFamily="body">
                    {formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                        locale: ptBR
                    })}
                </Text>
            </HStack>
        </Pressable>
    )
}