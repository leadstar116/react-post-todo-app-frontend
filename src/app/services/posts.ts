import { api } from "./api";

export interface IPost {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostParameters {
  title: string;
  description: string;
}

type PostsResponse = IPost[];

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => ({ url: "posts" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Posts", id } as const)),
        { type: "Posts" as const, id: "LIST" },
      ],
    }),
    createPost: build.mutation<IPost, IPostParameters>({
      query: (body: IPostParameters) => ({
        url: `posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<IPost, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_post, _err, id) => [{ type: "Posts", id }],
    }),
    updatePost: build.mutation<IPost, Partial<IPost>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `posts/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (post) => [{ type: "Posts", id: post?.id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (post) => [{ type: "Posts", id: post?.id }],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
} = postsApi;
