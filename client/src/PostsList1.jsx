import { useQuery, useQueries } from "@tanstack/react-query";
import { getPost, getPosts } from "./api/posts";

export default function PostsList1() {
  const postsQuery = useQuery({
    // this postQuery hsa 3 fetchStatus - fetching, idle and paused, any time we re refetching the query it will be in the fetching status
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Initial Data" }],
  });

  // the useQueries will look like this

  const queries = useQueries({
    queries: (postsQuery?.data??[]).map((post) => { // if the data doesn't exist return and empty []
      return {
        querykey: ["post", post.id],
        queryFn: () => getPost(post.id),
      };
    }),
  });
  console.log(queries.map((q) => q.data));

  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
