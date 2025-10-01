import { Permissions, PermissionType, RoleType } from "../enums/role.enum";

export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  JOB_SEEKER: [
    Permissions.APPLY_JOB,
    Permissions.VIEW_JOBS,
    Permissions.VIEW_MY_APPLICATIONS,
    Permissions.VIEW_MESSAGES,
    Permissions.SEND_MESSAGE,
  ],
  RECRUITER: [
    Permissions.POST_JOB,
    Permissions.DELETE_JOB,
    Permissions.EDIT_JOB,
    Permissions.MANAGE_APPLICATIONS,
    Permissions.MANAGE_COMPANY,
    Permissions.VIEW_APPLICANTS,
    Permissions.VIEW_PROFILE,
    Permissions.CREATE_MEETING,
    Permissions.DELETE_MEETING,
  ],
};
