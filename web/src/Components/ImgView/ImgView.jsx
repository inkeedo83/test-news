import b64toBlob from "/src/handlers/ImgHandler";

export function ImgView({ className, image, id, style }) {
  const blob = b64toBlob(image, "image/png");
  const imageUrl = URL.createObjectURL(blob);

  return <img className={className} style={style} src={imageUrl} alt="any" />;
}
