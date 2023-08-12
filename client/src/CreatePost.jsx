import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef()
  const bodyRef = useRef()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({ //takes only one prps ie the mutatinos fn
    mutationFn: createPost,
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data) // this will create a new entry in our cache with the query key and the dat
      //it will invalidate only when it has the exact kw (posts)
      queryClient.invalidateQueries(["posts"], { exact: true }) //anytime we wanna mutate the query we do wana invalidate any query related to the mutations(since we re changing the data of the query)
      setCurrentPage(<Post id={data.id} />)
    },
  })

  function handleSubmit(e) {
    e.preventDefault()
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}
