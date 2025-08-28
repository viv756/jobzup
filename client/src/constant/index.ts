export const JobCategories = [
  "Software & IT",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Human Resources",
  "Engineering",
  "Customer Support",
  "Data & Analytics",
  "Content Writing",
  "Product Management",
  "Project Management",
  "Other",
] as const;

export const JobTypeEnum = {
  Full_Time: "Full_Time",
  Part_Time: "Part_Time",
  Fresher:"Fresher"
} as const;

export const GenderEnum = {
  male: "male",
  female: "female",
  other: "other",
} as const;

export type GenderEnumType = keyof typeof GenderEnum;
export type JobCategoriesType = (typeof JobCategories)[number];
export type JobTypeEnumType = (typeof JobTypeEnum)[keyof typeof JobTypeEnum];
