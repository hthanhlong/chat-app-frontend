interface CustomSvgType {
  src: unknown
  alt: string
}

const CustomSvg = ({ src, alt }: CustomSvgType) => {
  return (
    <img
      className="mr-4 rounded bg-white"
      src={src ? src.toString() : ''}
      height={22}
      width={22}
      alt={alt}
    />
  )
}

export default CustomSvg
