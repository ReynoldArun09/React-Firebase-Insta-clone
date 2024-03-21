import {Container, Flex} from '@chakra-ui/react'
import useGetUserProfile from "../hooks/useGetUserProfile"
import {useParams} from 'react-router-dom'
import UserNotFound from "../components/UserNotFound/UserNotFound"
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfilePosts from '../components/Profile/ProfilePosts'
import ProfileTabs from '../components/Profile/ProfileTabs'
import ProfileHeaderSkeleton from '../components/Profile/ProfileHeaderSkeleton'

export default function Profilepage() {
  const {username} = useParams()
  const {isLoading, userProfile} = useGetUserProfile(username)
  const userNotFound = !isLoading && !userProfile
  if(userNotFound) {
    return <UserNotFound />
  }

  return (
    <Container maxW='container.lg' py={5}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
				{!isLoading && userProfile && <ProfileHeader />}
				{isLoading && <ProfileHeaderSkeleton />}
			</Flex>
			<Flex
				px={{ base: 2, sm: 4 }}
				maxW={"full"}
				mx={"auto"}
				borderTop={"1px solid"}
				borderColor={"whiteAlpha.300"}
				direction={"column"}
			>
				<ProfileTabs />
				<ProfilePosts />
			</Flex>
		</Container>
  )
}
