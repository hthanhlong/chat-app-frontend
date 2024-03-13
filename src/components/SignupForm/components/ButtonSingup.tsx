import Button from "../../Button/Button"
import Spin from "../../Spin/Spin"

const ButtonSignup = ({ isLoading }: { isLoading: boolean }) => {
  const styles = `w-full mt-8 focus:outline-none
  text-white
  bg-green-700 hover:bg-green-800 focus:ring-4
  focus:ring-green-300
  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${
    isLoading ? "opacity-50" : ""
  }`

  return (
    <>
      {isLoading ? (
        <button className={styles}>
          <div className="flex justify-center items-center">
            <Spin />
            <span className="ml-3">Signing up...</span>
          </div>
        </button>
      ) : (
        <Button type="submit" text="Sign up" className={styles} />
      )}
    </>
  )
}

export default ButtonSignup
