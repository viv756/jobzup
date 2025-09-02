import DashCard from "./_components/Dash_Card";

const DashBoard = () => {
  return (
    <>
      <div className="h-30 flex items-center">
        <h1 className="text-3xl font-semibold">Welcome back!jen jav</h1>
      </div>
      <div className="flex gap-10">
        <DashCard />
        <DashCard />
        <DashCard />
        <DashCard />
      </div>
    </>
  );
};

export default DashBoard;
