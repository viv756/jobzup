export const GenderEnum ={
  male : "male",
  female : "female",
  other : "other",
} as const

export type GenderEnumType = keyof typeof GenderEnum