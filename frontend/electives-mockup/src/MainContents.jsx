import React from "react";
import { ReactComponent as Magnifying } from "./assets/magnifying.svg";
import { ReactComponent as DownArrow } from "./assets/chevron_down.svg";
import reviewData from "./courses.json";
import ReviewCard from "./ReviewCard";
import SearchModal from "./SearchModal";

function MainContent() {
  const [defaultColour, setDefault] = React.useState(true);
  const [modalStatus, setModalStatus] = React.useState(false);

  // Set of two functions to help control the state of the modal appearing
  function openModal() {
    setModalStatus(true);
  }

  function closeModal() {
    setModalStatus(false);
  }

  // Small function that helps with changing the colour of the title with state
  function changeColour() {
    setDefault(defaultColour ? false : true);
  }

  return (
    <>
      <div className="ml-48 pt-8">
        <SearchModal isOpen={modalStatus} onClose={closeModal}></SearchModal>
        <span>DevSoc presents</span>
        <h1
          className={`pt-4 pb-4 text-7xl font-bold cursor-default	 ${
            defaultColour ? "text-[#1479f2]" : "text-[#F8C8DC]"
          }`}
          onClick={() => changeColour()}
        >
          unielectives
        </h1>

        <span className="font-bold">
          Your one-stop shop for UNSW course and elective reviews
        </span>

        <form className="relative pt-8 pb-6 flex items-center focus:border-[#9cade9]">
          <Magnifying className="absolute pl-2 text-[#9cade9] h-6 w-6 "></Magnifying>

          <input
            className="pl-10 w-10/12  h-10 justify-center border-solid border-2 border-[#9cade9] rounded-md text-[#9cade9] focus:border-[#9cade9] focus:ring-0 focus:outline-none"
            placeholder="Search for a course e.g. COMP1511"
            onClick={() => openModal()}
          ></input>
        </form>

        <button className="border-solid border-2 rounded-md w-48 h-10 flex text-gray space-x-24 justify-center items-center">
          <span>Sort by</span>
          <DownArrow className="h-6 w-6"></DownArrow>
        </button>

        {/* Course Card Elements */}
        <div className="flex flex-wrap w-10/12 pt-8 gap-16">
          {reviewData.map((reviewCard) => {
            return (
              <ReviewCard
                key={reviewCard.course_code}
                details={reviewCard}
                className="flex justify-around"
              ></ReviewCard>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainContent;
