import ResumeSection from "./_components/resume-section";
import AiAnalyzer from "./_components/ai-analyzer";

const ResumeAnalyser = () => {

  

  return (
    <>
      <div className=" flex flex-col items-center gap-3 mt-8">
        <h1 className="text-center text-5xl font-satoshi font-bold">
          AI Resume <span className="text-[#2454CE]">Analyzer</span>
        </h1>
        <div className="flex items-center flex-col">
          <p className="text-lg font-satoshi">
            Evaluate your resume’s ATS compatibility, keyword alignment, and structure.
          </p>
          <p className="text-base text-muted-foreground font-satoshi">
            Upload your resume and provide the job description to begin analysis.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 h-full sm:px-20 px-2 mt-10">
        <ResumeSection />
        <AiAnalyzer />
      </div>
    </>
  );
};

export default ResumeAnalyser;
