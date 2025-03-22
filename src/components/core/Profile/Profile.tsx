// export interface IUser {
//   username: string
//   nickname: string
//   caption: string
//   profilePicUrl: string
// }

import { useGetMe } from '../../../core/hooks'
import { useEffect, useState } from 'react'
import AvatarDefaultImage from '../../../assets/images/a5-avatar-default.jpeg'
import { useForm } from 'react-hook-form'

const Profile = () => {
  const { handleSubmit, register } = useForm<{
    avatar: File[]
    nickname: string
    caption: string
  }>()
  const [canSubmit, setCanSubmit] = useState(false)
  const { data } = useGetMe()
  const [preview, setPreview] = useState<string | null>(null)

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const onSubmit = (data: {
    avatar: File[]
    nickname: string
    caption: string
  }) => {
    if (!data.avatar || data.avatar.length === 0) {
      return
    }
    const formData = new FormData()
    formData.append('avatar', data.avatar[0])
    formData.append('nickname', data.nickname)
    formData.append('caption', data.caption)
    console.log(formData)
  }

  useEffect(() => {
    setCanSubmit(!!data?.data?.nickname)
  }, [data?.data?.nickname])

  return (
    <div className="p-8">
      <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="dark:text-white">
          <div>
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="text-lg font-bold">Profile picture</div>
              <div>
                <label className="inline-block" htmlFor="avatar">
                  <img
                    src={
                      data?.data?.profilePicUrl || preview || AvatarDefaultImage
                    }
                    alt="avatar"
                    className="h-20 w-20 cursor-pointer rounded-full border-2 border-gray-300"
                  />
                </label>
                <input
                  {...register('avatar', {
                    required: 'Ảnh là bắt buộc',
                    validate: (files) =>
                      files.length === 1 || 'Chỉ được chọn 1 ảnh',
                  })}
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handlePreview}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="nickname">
              Profile name
            </label>
            <input
              {...register('nickname')}
              className="w-full rounded-md border-gray-300 bg-gray-100 p-2 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
              type="text"
              id="nickname"
              defaultValue={data?.data?.nickname}
            />
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="caption">
              Caption
            </label>
            <input
              {...register('caption')}
              className="w-full rounded-md border-gray-300 bg-gray-100 p-2 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
              type="text"
              id="caption"
              defaultValue={data?.data?.caption}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-7 rounded-md bg-blue-500 px-4 py-2 text-white"
              disabled={!canSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
