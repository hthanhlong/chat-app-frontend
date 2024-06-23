interface ICustomSvgType {
  src: unknown
  alt?: string
}

const CustomSvg = ({ src, alt, ...props }: ICustomSvgType) => {
  return (
    <img
      {...props}
      src={src ? src.toString() : ''}
      height={22}
      width={22}
      alt={alt || 'none'}
    />
  )
}

export default CustomSvg
