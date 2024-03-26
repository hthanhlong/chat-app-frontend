import { AvatarDefault } from "../../assets"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserById } from "../../axios/user"
import { useAuth } from "../../hooks/useAuth"
import { Tooltip } from "flowbite-react"

const Avatar = ({
  avatarUrl,
  name,
  caption,
  className,
  size = "xl",
  textSize = "lg",
  isOnline = false,
  isEditable = false,
}: {
  name?: string
  avatarUrl?: string
  caption?: string
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  textSize?: "xs" | "sm" | "md" | "lg" | "xl"
  isOnline?: boolean
  isEditable?: boolean
}) => {
  const { handleSubmit, register } = useForm()
  const { id } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: (data: Record<string, unknown>) => {
      return updateUserById(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] })
    },
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    await mutateAsync(data)
  }

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".input-caption")) {
        setIsEdit(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <form
      className={`flex items-center w-full h-full ${
        className ? className : ""
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <AvatarDefault
        isOnline={isOnline}
        size={size}
        avatarUrl={
          avatarUrl || "https://avatars.githubusercontent.com/u/54071671?v=4"
        }
      />
      <div className="ml-3 flex-1 h-full">
        <div className={`text-${textSize} dark:text-gray-300 h-full`}>
          <span>{name}</span>
        </div>
        {caption && isEditable ? (
          <div className="flex text-xs text-gray-500 dark:text-gray-300 items-center">
            {!isEdit ? (
              <>
                <Tooltip content={caption}>
                  <div
                    onDoubleClick={
                      isEditable ? () => setIsEdit(!isEdit) : undefined
                    }
                    className="inline-block w-[140px] h-full truncate ..."
                  >
                    {caption}
                  </div>
                </Tooltip>
              </>
            ) : (
              <>
                <input
                  {...register("caption")}
                  type="text"
                  className="input-caption bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 border-b-[1px] ps-1 focus:ring-0 border-0 focus:dark:outline-none text-xs h-[16px] w-[140px]"
                  autoComplete="off"
                />
              </>
            )}
          </div>
        ) : (
          <div className="flex text-xs text-gray-500 dark:text-gray-300 items-center">
            <span className="truncate ...">{caption}</span>
          </div>
        )}
      </div>
      <input type="submit" hidden />
    </form>
  )
}

export default Avatar
