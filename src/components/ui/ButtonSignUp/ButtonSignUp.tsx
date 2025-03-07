import Button from '../Button/Button'
import Spin from '../Spin/Spin'

const ButtonSignUp = ({ isLoading }: { isLoading: boolean }) => {
  const styles = `w-full mt-8 focus:outline-none
  text-white
  text-lg
  bg-[#6d4aff] hover:bg-opacity-80 focus:ring-4
  focus:ring-[#6d4aff]
  font-medium rounded-lg px-5 py-2.5 mb-2 ${isLoading ? 'opacity-50' : ''}`

  return (
    <>
      {isLoading ? (
        <button className={styles}>
          <div className="flex items-center justify-center">
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

export default ButtonSignUp
