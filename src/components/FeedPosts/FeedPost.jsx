/* eslint-disable react/prop-types */
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import { Box, Image } from "@chakra-ui/react";

export default function FeedPost({post}) {
  const {userProfile} = useGetUserProfileById(post.createdBy)
  return (
    <>
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.imageURL} alt={"FEED POST IMG"} />
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</>
  )
}
