import { HStack, Input, Pressable, VStack } from "native-base";
import Logo from "@assets/Logo.svg";
import { MagnifyingGlass, SignOut as SignOutIcon } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";

interface HeaderHomeProps {
  search: string;
  setSearch: (newSearch: string) => void;
}

export function HeaderHome({ search, setSearch }: HeaderHomeProps) {
  const { SignOut } = useAuth();
  
  return (
    <VStack mt={16}>
      <HStack alignItems="center" justifyContent="space-between">
        <Logo height={30} width={100} />

        <Pressable onPress={SignOut}>
          <SignOutIcon size={32} />
        </Pressable>
      </HStack>

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
  );
}
