import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getPost } from "./api/posts"
import { CreatePost } from "./CreatePost"
import Post from "./Post"
import { PostListInfinite } from "./PostListInfinite"
import { PostListPaginated } from "./PostListPaginated"
import PostsList1 from "./PostsList1"
import PostsList2 from "./PostsList2"

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />)
  const queryClient = useQueryClient()

  function onHoverPostOneLink() { // the prefetch/(precache the data) the query on the mouse hover over the link
    queryClient.prefetchQuery({
      queryKey: ["posts", 1], // the unique id (for the key).. and everything in this query key is cached and stored in the memomry
      queryFn: () => getPost(1),
    })
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>

      {/* whenever we hover over the link we wana actually query the data for that.  */}
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  )
}
