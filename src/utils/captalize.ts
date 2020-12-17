export default function captalize(str: string) {
  const strCaptalize = (str.charAt(0).toUpperCase() + str.substr(1)).replace(
    /([!?.]\s+)([a-z])/g,
    (m, $1, $2) => {
      return $1 + $2.toUpperCase();
    }
  );
  return strCaptalize;
}
