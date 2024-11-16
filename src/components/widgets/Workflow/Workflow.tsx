export default function Workflow() {
  return (
    <div className={"bg-white flex flex-col p-[0.781vw] rounded-[0.521vw] w-full h-full"}>
      <div className={"w-full flex flex-row justify-between items-center"}>
        <span className={"text-black text-[1.667vw] font-medium"}>Workflow Space</span>
        <button
          className={
            "flex hover:opacity-80 flex-row bg-gradient-to-r from-[#FF603A] to-[#F3B440] justify-center items-center py-[0.781vw] px-[1.25vw] rounded-full gap-[0.521vw]"
          }
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"w-[1.146vw]"}
          >
            <path
              d="M15.2857 1H6.71423"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.2857 6.71423V10.9999H21L11 20.9999L1 10.9999H6.71429V6.71423H15.2857Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={"text-white text-[1.042vw] font-medium"}>Compile</span>
        </button>
      </div>
    </div>
  );
}
