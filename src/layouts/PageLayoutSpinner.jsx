import { Flex, Spinner } from "@chakra-ui/react";

export default function PageLayoutSpinner() {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  );
}
