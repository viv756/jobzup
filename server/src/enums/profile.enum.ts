export const GenderEnum ={
  Male : "Male",
  Female : "Female",
  Other : "Other",
} as const

export type GenderEnumType = keyof typeof GenderEnum