import { ClassAttributes, FormHTMLAttributes, useEffect } from "react"
import { useForm } from "react-hook-form"
import { JSX } from "react/jsx-runtime"
import useDebounce from "../../hooks/useDebounce"
import { useAuth } from "../../hooks/useAuth"
import { getMyFriends, searchFriends } from "../../axios/friend"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useQuery } from "@tanstack/react-query"

const SearchBar = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLFormElement> &
    FormHTMLAttributes<HTMLFormElement>
) => {
  const { id } = useAuth()
  const { register, handleSubmit, watch } = useForm()
  const { setListFriends } = useSelectedUserChat()
  const watchShowAge = watch("search-friend")
  const { valueDebounce } = useDebounce(watchShowAge)

  const { data } = useQuery({
    queryKey: ["myFriends"],
    queryFn: () => getMyFriends(id),
  })

  const onSubmit = async (keyword: string) => {
    const friends = await searchFriends({
      id,
      keyword: keyword,
    })
    setListFriends(friends.data)
  }

  useEffect(() => {
    if (!valueDebounce) {
      setListFriends(data?.data)
    } else {
      onSubmit(valueDebounce)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueDebounce])

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit as never)}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-700 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          {...register("search-friend", { required: true, maxLength: 64 })}
          type="search"
          id="default-search"
          className="block w-full p-2.5 ps-10 text-sm text-black bg-gray-100 rounded-full focus:ring-0 border-0"
          placeholder="Searching..."
        />
      </div>
    </form>
  )
}

export default SearchBar
