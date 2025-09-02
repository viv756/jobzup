export const RoleEnum = {
  RECRUITER: "RECRUITER",
  JOB_SEEKER: "JOB_SEEKER",
  ADMIN: "ADMIN",
} as const;

export type RoleEnumType = keyof typeof RoleEnum;
