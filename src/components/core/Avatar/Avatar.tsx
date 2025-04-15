import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Tooltip } from 'flowbite-react'
import { UserService } from '../../../core/services'
import { AvatarDefault } from '../../ui'
import AvatarDefaultImage from '../../../assets/images/a5-avatar-default.jpeg'

const Avatar = ({
  avatarUrl,
  name,
  caption,
  className,
  size = 'md',
  isOnline = false,
  isEditable = false,
}: {
  name?: string
  avatarUrl?: string
  caption?: string
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isOnline?: boolean
  isEditable?: boolean
}) => {
  const { handleSubmit, register } = useForm<{ caption: string }>()
  const queryClient = useQueryClient()
  const [isEdit, setIsEdit] = useState(false)

  const { mutateAsync } = useMutation({
    mutationFn: (data: FormData) => UserService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-me'] })
    },
  })

  const onSubmit = async (data: { caption: string }) => {
    if (data.caption.length > 64 || data.caption.length < 1) {
      return
    }
    const formData = new FormData()
    if (data.caption.length > 64 || data.caption.length < 1) {
      return
    }
    formData.append('caption', data.caption)
    await mutateAsync(formData)
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.input-caption')) {
        setIsEdit(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <form
      className={`flex h-full items-center ${className ? className : ''}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AvatarDefault
        isOnline={isOnline}
        size={size}
        avatarUrl={avatarUrl || AvatarDefaultImage}
      />
      <div className="ml-2">
        <div className="max-lg:text-md flex h-full items-center text-[14px] text-black dark:text-gray-300">
          <span>{name || ''}</span>
        </div>
        {caption && isEditable ? (
          <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-300">
            {!isEdit ? (
              <>
                <Tooltip content={caption}>
                  <div
                    onDoubleClick={
                      isEditable ? () => setIsEdit(!isEdit) : undefined
                    }
                    className="... inline-block h-full w-[140px] truncate text-xs"
                  >
                    {caption}
                  </div>
                </Tooltip>
              </>
            ) : (
              <>
                <input
                  {...register('caption', {
                    maxLength: 256,
                    minLength: 1,
                  })}
                  type="text"
                  className="input-caption h-[16px] w-[140px] border-0 border-b-[1px] bg-gray-100 ps-1 text-xs text-gray-700 focus:ring-0 dark:bg-black dark:text-gray-300 focus:dark:outline-none"
                  autoComplete="off"
                />
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-300">
            <span className="... truncate">{caption}</span>
          </div>
        )}
      </div>
      <input type="submit" hidden />
    </form>
  )
}

export default Avatar
