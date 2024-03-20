import { Button } from "flowbite-react"
import { Avatar } from "../../../components"
import { useQuery } from "@tanstack/react-query"
import { getFriendRequests } from "../../../axios/friend"
import { useAuth } from "../../../hooks/useAuth"

const FriendRequest = () => {
  const { id: senderId } = useAuth()

  const { data: ListUser, isLoading: isLoadingGetListUser } = useQuery({
    queryKey: ["listUser"],
    queryFn: () => getFriendRequests(senderId),
  })

  console.log("ListUser", ListUser)

  return (
    <div className="flex flex-wrap h-[980px] overflow-auto">
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
      <div className="border-[1px] w-[calc(50%-8px)] m-1 rounded-md py-1 px-2 flex items-center justify-between hover:bg-gray-100">
        <Avatar name="Brett Johnson" textSize="md" />
        <div className="flex">
          <Button color="blue" size="sm" className="mr-1">
            Accept
          </Button>
          <Button color="red" size="sm">
            Reject
          </Button>
        </div>
      </div>
    </div>
  )
}
export default FriendRequest
