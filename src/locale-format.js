export function credentialCount(count, language) {
  if (language !== "ar") return count + (count === 1 ? " credential" : " credentials");
  if (count === 1) return "شهادة واحدة";
  if (count === 2) return "شهادتان";
  const number = new Intl.NumberFormat("ar-u-nu-arab").format(count);
  return number + (count >= 3 && count <= 10 ? " شهادات" : " شهادة");
}
