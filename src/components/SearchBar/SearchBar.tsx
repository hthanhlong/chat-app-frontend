import { ClassAttributes, FormHTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { JSX } from 'react/jsx-runtime'
import useDebounce from '../../hooks/useDebounce'
import { useAuth } from '../../hooks/useAuth'
import { getMyFriends, searchFriends } from '../../axios/friend'
import { useSelectedUserChat } from '../../hooks/useSelectedUserChat'
import { useQuery } from '@tanstack/react-query'

const SearchBar = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLFormElement> &
    FormHTMLAttributes<HTMLFormElement>,
) => {
  const { id } = useAuth()
  const { register, handleSubmit, watch } = useForm()
  const { setListFriends } = useSelectedUserChat()
  const watchShowAge = watch('search-friend')
  const { valueDebounce } = useDebounce(watchShowAge)

  const { data } = useQuery({
    queryKey: ['myFriends'],
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
  }, [valueDebounce])

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit as never)}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-700 dark:text-gray-400"
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
          {...register('search-friend', { required: true, maxLength: 64 })}
          type="search"
          id="default-search"
          className="block w-full rounded-full border-0 bg-gray-100 p-2.5 ps-10 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
          placeholder="Searching..."
          autoComplete="off"
        />
      </div>
    </form>
  )
}

export default SearchBar
