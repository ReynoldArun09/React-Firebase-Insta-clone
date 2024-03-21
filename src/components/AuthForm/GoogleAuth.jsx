/* eslint-disable react/prop-types */
import {Image, Flex, Text} from '@chakra-ui/react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

export default function GoogleAuth({prefix}) {
  const {handleGoogleAuth} = useGoogleLogin()
  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
			<Image src='/google.png' w={5} alt='Google logo' />
			<Text mx='2' color={"blue.500"}>
				{prefix} with Google
			</Text>
		</Flex>
  )
}
