export const RoleEnum = {
  RECRUITER: "RECRUITER",
  CANDIDATE: "CANDIDATE",
  ADMIN: "ADMIN",
} as const;

export type RoleEnumType = keyof typeof RoleEnum;
