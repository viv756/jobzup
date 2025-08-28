import type { Awards, Education, WorkExperience } from "../types/api.type";

export const filterWorkExperience = (workExperience: WorkExperience[]) => {
  const data = workExperience.filter(
    (w) =>
      w.company.trim() !== "" ||
      w.position.trim() !== "" ||
      w.startDate !== null ||
      w.endDate !== null ||
      w.description.trim() !== ""
  );

  return data;
};

export const filterAwards = (awars: Awards[]) => {
  const data = awars.filter(
    (a) => a.name.trim() !== "" || a.date !== null || a.description.trim() !== ""
  );

  return data;
};

export const filterEducation = (education: Education[]) => {
  const data = education.filter(
    (e) =>
      e.collegeName.trim() !== "" ||
      e.department.trim() !== "" ||
      e.startDate !== null ||
      e.endDate !== null ||
      e.description.trim() !== ""
  );

  return data;
};
