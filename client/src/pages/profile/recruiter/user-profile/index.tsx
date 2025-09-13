import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Globe } from "lucide-react";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";

import { getUserByIdApiFn } from "../../../../lib/api";
import type { ProfileType, UserType } from "../../../../types/api.type";

const UserProfile = () => {
  const [user, setUser] = useState<(UserType & { profile: ProfileType | null }) | undefined>();

  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      try {
        const data = await getUserByIdApiFn(userId as string);
        if (data) {
          setUser(data.user);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>loding</div>;
  }

  return (
    <div className="sm:pt-10  ">
      <div className="flex sm:flex-row flex-col gap-8 bg-white rounded-2xl">
        <div className="border border-gray-300 rounded-2xl p-7 max-h-[800px]">
          <div className="flex flex-col items-center gap-5 ">
            <div className="rounded-full">
              <img
                src={user?.profilePicture}
                alt=""
                className="w-30 h-30 object-cover rounded-full "
              />
            </div>
            <div className="flex flex-col gap-3 text-center">
              <p className="text-xl font-semibold font-dm">{user?.name}</p>
              <p className="text-gray-700 font-dm">Ux Ui design</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-gray-800 flex items-center gap-2 text-md font-dm">
              <MapPin className="" color="#050100" size={20} />
              {user?.profile?.location}
            </p>
            <p className="text-gray-800 flex items-center gap-2 text-md font-dm">
              <Globe color="#050100" size={20} /> {user?.profile?.language.join(",")}
            </p>

            <button className="bg-blue-700 text-white p-3 rounded-xl w-full mt-4 font-dm">
              Send Message
            </button>

            <h3 className="text-lg font-semibold font-dm text-gray-950 mt-5">Skills</h3>
            <div className="flex flex-wrap gap-4 mt-3">
              {user?.profile?.skills &&
                user.profile.skills.map((skill) => (
                  <p className="p-1 px-3 bg-gray-200 rounded-3xl">{skill}</p>
                ))}
            </div>

            <h3 className="text-lg font-semibold font-dm text-gray-950 mt-6">Insights</h3>
            <div className="grid grid-cols-2 mt-3  gap-3">
              <p className="text-gray-950">All time Earnings</p>
              <p className="text-black place-self-end font-semibold">$6,612</p>
              <p>Services Completed</p>
              <p className="place-self-end font-semibold">0</p>
              <p>Member Since</p>
              <p className="place-self-end font-semibold ">Jul 2024</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl text-center font-dm mt-5">About Me</h1>
          <hr className="border border-gray-400 mt-3" />

          <div className="grid grid-cols-4 gap-1 mt-5">
            <div>
              <p className="text-lg text-gray-950">Experience time</p>
              <span>{user?.profile?.experianceTime} </span>
            </div>
            <div>
              <p className="text-lg text-gray-950">Qualification</p>
              <span>{user?.profile?.qualification}</span>
            </div>
            <div>
              <p className="text-lg text-gray-950">Gender</p>
              <span>{user?.profile?.gender}</span>
            </div>
            <div>
              <p className="text-lg text-gray-950">Age</p>
              <span>{user?.profile?.age}</span>
            </div>
          </div>

          <p className="mt-7 text-gray-700 font-dm">{user?.profile?.bio}</p>

          {user?.profile?.workExperiance && user.profile.workExperiance.length > 0 && (
            <>
              <h1 className="text-2xl mt-6 font-semibold font-dm">Work Experience</h1>
              <div className="m-6">
                <ol className="relative border-s border-blue-700 border-dashed">
                  {user.profile.workExperiance.map((work, index) => (
                    <li className="mb-10 ms-4 " key={index}>
                      <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-blue-700"></div>

                      {/* Job Title */}
                      <h3 className="text-lg font-dm text-black">{work.position}</h3>

                      {/* Company + Date */}
                      <div className="flex gap-3 items-center ">
                        <p className="text-[#0A65FC]">{work.company}</p>
                        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                        <p className=" text-sm  leading-none text-[#444444] font-dm">
                          {format(work.startDate, "MMMM dd,yyyy")} -{" "}
                          {format(work.endDate, "MMMM dd,yyyy")}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-base font-dm text-[#444444] mt-4">
                        {work.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {user?.profile?.education && user.profile.education.length > 0 && (
            <>
              <h1 className="text-2xl mt-6 font-semibold font-dm">Education</h1>

              <div className="m-6">
                <ol className="relative border-s border-blue-700 border-dashed">
                  {user.profile.education.map((edu, index) => (
                    <li className="mb-10 ms-4" key={index}>
                      <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-blue-700"></div>

                      <h3 className="text-lg font-dm text-black">{edu.collegeName}</h3>

                      <div className="flex gap-3 items-center ">
                        <p className="text-[#0A65FC]">{edu.department}</p>
                        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                        <p className=" text-sm font-dm leading-none text-[#444444]">
                          {format(edu.startDate, "MMMM dd,yyyy")} -{" "}
                          {format(edu.endDate, "MMMM dd,yyyy")}
                        </p>
                      </div>

                      <p className="mb-4 text-base font-dm text-[#444444] mt-4">
                        {edu.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {user?.profile?.education && user.profile.education.length > 0 && (
            <>
              <h1 className="text-2xl mt-6 font-semibold font-dm">Honors & awards</h1>

              <div className="m-6">
                <ol className="relative border-s border-blue-700 border-dashed">
                  {user.profile.awards.map((awa, index) => (
                    <li className="mb-10 ms-4" key={index}>
                      <div className="absolute w-3 h-3 bg-white rounded-full mt-1.5 -start-1.5 border border-blue-700"></div>

                      <h3 className="text-lg font-dm text-black">{awa.name}</h3>

                      <div className="flex gap-3 items-center mt-1">
                        <p className=" text-sm leading-none text-[#444444] font-dm">
                          {format(awa.date, "MMMM dd,yyyy")}
                        </p>
                      </div>

                      <p className="mb-4 text-base font-dm text-[#444444] mt-4">
                        {awa.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
