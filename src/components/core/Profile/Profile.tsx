import { useState, useEffect } from 'react'
import { useGetMe } from '../../../core/hooks'
import AvatarDefaultImage from '../../../assets/images/a5-avatar-default.jpeg'
import { useForm } from 'react-hook-form'
import UserService from '../../../core/services/UserService'
import { toast } from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const Profile = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<{
    avatar: File
    nickName: string
    caption: string
  }>()
  const { data } = useGetMe()
  const [canSubmit, setCanSubmit] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const watchName = watch('nickName')
  const watchCaption = watch('caption')
  const watchAvatar = watch('avatar')
  const queryClient = useQueryClient()
  console.log(errors)

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    if (file) {
      setValue('avatar', file)
      setPreview(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (
      (watchAvatar instanceof File && watchAvatar !== data?.data?.avatar) ||
      (watchName && watchName !== data?.data?.nickName) ||
      (watchCaption && watchCaption !== data?.data?.caption)
    ) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }

    if (watchName && watchName.length > 16) {
      setError('nickName', {
        message: 'Max length is 16 characters',
        type: 'maxLength',
      })
    } else {
      clearErrors('nickName')
    }

    if (watchCaption && watchCaption.length > 256) {
      setError('caption', {
        message: 'Max length is 256 characters',
        type: 'maxLength',
      })
    } else {
      clearErrors('caption')
    }
  }, [watchAvatar, watchName, watchCaption])

  const onSubmit = async (data: {
    avatar: File
    nickName: string
    caption: string
  }) => {
    const formData = new FormData()
    if (data.avatar) {
      formData.append('file', data.avatar)
    }
    if (data.nickName) {
      formData.append('nickName', data.nickName)
    }
    if (data.caption) {
      formData.append('caption', data.caption)
    }
    try {
      const response = await UserService.updateUser<{
        profilePicUrl: string
        nickName: string
        caption: string
      }>(formData)
      if (response.isSuccess === true) {
        toast.success('Update profile successfully')
        queryClient.invalidateQueries({ queryKey: ['get-me'] })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8">
        <div className="dark:text-white">
          <div>
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="text-lg font-bold">Profile picture</div>
              <div>
                <label className="inline-block" htmlFor="avatar">
                  <img
                    src={
                      preview || data?.data?.profilePicUrl || AvatarDefaultImage
                    }
                    alt="avatar"
                    className="h-20 w-20 cursor-pointer rounded-full border-2 border-gray-300"
                  />
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  {...register('avatar')}
                  onChange={handlePreview}
                  className="hidden"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="nickName">
              Profile name
            </label>
            <input
              {...register('nickName', {
                maxLength: {
                  value: 16,
                  message: 'Max length is 16 characters',
                },
                minLength: {
                  value: 4,
                  message: 'Min length is 4 characters',
                },
              })}
              className="w-full rounded-md border-gray-300 bg-gray-100 p-2 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
              type="text"
              id="nickName"
              autoComplete="off"
              onBlur={() => {
                watchName === '' && setValue('nickName', data?.data?.nickName)
              }}
              defaultValue={data?.data?.nickName}
            />
            {errors.nickName && (
              <p className="text-xs text-red-500">{errors.nickName.message}</p>
            )}
          </div>
          <div className="mb-2 flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="caption">
              Caption
            </label>
            <input
              {...register('caption', {
                maxLength: {
                  value: 256,
                  message: 'Max length is 256 characters',
                },
              })}
              className="w-full rounded-md border-gray-300 bg-gray-100 p-2 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
              type="text"
              id="caption"
              autoComplete="off"
              onBlur={() => {
                watchCaption === '' && setValue('caption', data?.data?.caption)
              }}
              defaultValue={data?.data?.caption}
            />
            {errors.caption && (
              <p className="text-xs text-red-500">{errors.caption.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <input
              type="submit"
              disabled={!canSubmit}
              className="mt-7 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default Profile
