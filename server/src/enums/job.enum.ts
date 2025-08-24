export const JobTypeEnum = {
  Full_Time: "Full_Time",
  Part_Time: "Part_Time",
  Fresher:"Fresher"
} as const

export type JobTypeEnumType = typeof JobTypeEnum[keyof typeof JobTypeEnum];