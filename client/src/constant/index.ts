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
  "Other"
] as const;

export type JobCategoriesType = typeof JobCategories[number]