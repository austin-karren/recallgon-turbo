import { useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import { ErrorPage, LoadingPage } from "components/loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { api, type RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

const PostWizard: React.FC = () => {
  const { user } = useUser();
  const postRef = useRef<HTMLInputElement>(null);

  const ctx = api.useContext();

  const { mutate: createPost, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      if (postRef?.current) postRef.current.value = "";
      void ctx.post.getAll.invalidate(); // void to ignore promise
    }
  });

  console.log("userId", user?.id);

  if (!user) {
    return null;
  }

  return (
    <div className="flex gap-3 w-full">
      <Image
        src={user?.profileImageUrl || "/user-circle.png"}
        alt="Profile image"
        className="rounded-full"
        width={44}
        height={44}
      />
      <input
        placeholder="✨ Type your favorite emojis"
        className="bg-transparent grow outline-none text-xl"
        ref={postRef}
        disabled={isPosting}
      />
      <button
        onClick={() => {
          if (postRef?.current) createPost({
            content: postRef.current.value,
          });
        }}
      >
        post
      </button>
    </div>
  );
};

type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = ({ post, author }: PostWithUser) => {
  return (
    <div
      key={post.id}
      className="p-4 border-b border-gray-500 flex items-center"
    >
      <div className="h-11 w-11">
        <Image
          src={author?.profileImageUrl || "/user-circle.png"}
          width={44}
          height={44}
          alt="Author image"
          className="rounded-full"
        />
      </div>
      <div className="px-4 flex flex-col">
        <div className="fle gap-1">
          <span className="font-normal text-gray-200">{`@${author?.username}`}</span>{" "}
          {" · "}
          <span className="font-normal text-gray-400">{`${dayjs(
            post?.createdAt,
          ).fromNow()}`}</span>
        </div>
        <p className="text-2xl">{post.content}</p>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data: posts, isLoading: postsLoading } = api.post.getAll.useQuery();

  if (postsLoading) {
    return <LoadingPage />;
  }

  if (!posts) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col">
      {posts.map((fullPost) => (
        <PostView {...fullPost} key={fullPost?.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching posts asap before first render
  api.post.getAll.useQuery();

  // Return empty div if user is not loaded
  if (!userLoaded) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>Eventer</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-[100dvh]">
        <div className="container w-full border-gray-500 md:border-x md:max-w-2xl">
          <div className="border-b border-gray-500 p-4 flex">
            {!isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {!!isSignedIn && (
              <div className="flex justify-center grow">
                <PostWizard />
              </div>
            )}
          </div>
          <Feed />
          {/* <CreatePostForm /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
