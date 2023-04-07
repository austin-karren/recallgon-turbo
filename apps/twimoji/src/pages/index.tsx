import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { api, type RouterOutputs } from "~/utils/api";

const PostCard: React.FC<{
  post: RouterOutputs["post"]["getAll"][number];
  onPostDelete?: () => void;
}> = ({ post, onPostDelete }) => {
  return (
    <div className="flex w-full max-w-2xl flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
          {post.title || <i>Untitled</i>}
        </h2>
        <p className="mt-2 text-sm">{post.content || <i>No content</i>}</p>
      </div>
      <div>
        <span
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={onPostDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

const CreatePostForm: React.FC = () => {
  const utils = api.useContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.getAll.invalidate();
    },
  });

  return (
    <div className="flex w-[80vw] flex-col p-4 md:w-[60vw] xl:w-[35vw]">
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button
        className="rounded bg-pink-700 p-2 font-bold"
        onClick={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        Create
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();

  const postQuery = api.post.getAll.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => postQuery.refetch(),
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          {/* posts */}
          <div>{postQuery.isLoading && <div>Loading...</div>}</div>
          <div>{!postQuery.data && !postQuery.isLoading && <div>No posts</div>}</div>
          <div>
            {postQuery.data?.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </div>

          {/* <CreatePostForm /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
