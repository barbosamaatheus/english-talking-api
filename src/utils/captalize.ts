export default function captalize(str: string) {
  const strCaptalize = (str.charAt(0).toLowerCase() + str.substr(1)).replace(
    RegExp(/([!?.]\s+)([a-z])/, "g"),
    (m, $1, $2) => {
      return $1 + $2.toLowerCase();
    }
  );
  return strCaptalize;
}
