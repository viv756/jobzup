export const Roles = {
  JOB_SEEKER: "JOB_SEEKER",
  RECRUITER: "RECRUITER",
} as const;

export type RoleType = keyof typeof Roles;

export const Permissions = {
  // Auth & Profile
  VIEW_PROFILE: "VIEW_PROFILE",
  EDIT_PROFILE: "EDIT_PROFILE",

  // Job Seeker Actions
  VIEW_JOBS: "VIEW_JOBS",
  APPLY_JOB: "APPLY_JOB",
  VIEW_MY_APPLICATIONS: "VIEW_MY_APPLICATIONS",

  // Recruiter Actions
  POST_JOB: "POST_JOB",
  EDIT_JOB: "EDIT_JOB",
  DELETE_JOB: "DELETE_JOB",
  VIEW_APPLICANTS: "VIEW_APPLICANTS",
  MANAGE_APPLICATIONS: "MANAGE_APPLICATIONS",
  MANAGE_COMPANY: "MANAGE_COMPANY",
  CREATE_MEETING: "CREATE_MEETING",
  DELETE_MEETING: "DELETE_MEETING",

  // Messaging
  SEND_MESSAGE: "SEND_MESSAGE",
  VIEW_MESSAGES: "VIEW_MESSAGES",
} as const;

export type PermissionType = keyof typeof Permissions;
