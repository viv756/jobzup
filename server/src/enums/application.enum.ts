export const ApplicationStatusEnum = {
  APPLIED: "APPLIED",
  UNDER_REVIEW: "UNDER_REVIEW",
  SHORTLISTED: "SHORTLISTED",
  INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
  INTERVIEWED: "INTERVIEWED",
  OFFERED: "OFFERED",
  HIRED: "HIRED",
  REJECTED: "REJECTED",
  WITHDRAWN: "WITHDRAWN",
  ON_HOLD: "ON_HOLD",
  PENDING: "PENDING",
} as const;

export type ApplicationStatusEnumType = keyof typeof ApplicationStatusEnum;
