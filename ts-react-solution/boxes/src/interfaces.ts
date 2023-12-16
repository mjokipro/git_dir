export interface BoxInterface {
  id: string,
  width: string | number,
  height: string | number,
  backgroundColor: string,
}

export interface BoxProps extends BoxInterface{
  remove: (id: string) => void,
}