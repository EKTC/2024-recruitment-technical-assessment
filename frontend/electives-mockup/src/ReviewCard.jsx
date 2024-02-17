import React from "react";

function ReviewCard(props) {
  let details = props.details;

  // Function that determines the number of coloured stars
  // And then creates the star elements
  function createStars() {
    let items = [];
    let remaining = 5;
    for (
      let counter = 0;
      counter < Math.ceil(details.average_stars);
      counter++
    ) {
      items.push(
        <li
          className="text-[#b789e5]"
          key={`${details.course_code}${counter}{s}`}
        >
          ★
        </li>
      );
      remaining -= 1;
    }

    for (let counter = 0; counter < remaining; counter++) {
      items.push(
        <li
          className="text-[#dddddd]"
          key={`${details.course_code}${counter}{r}`}
        >
          ★
        </li>
      );
    }
    return <>{items}</>;
  }

  return (
    <>
      <div className="bg-[#fafafa] border rounded-md shadow-xl h-48 w-[24rem] flex flex-col pl-8 pt-4">
        {/* Row with the course code and the star reviews */}
        <div className="flex flex-row">
          <h1 className="font-bold text-2xl pr-20">
            COMP{details.course_code}
          </h1>
          <ul className="flex flex-row text-3xl">{createStars()}</ul>
        </div>

        {/* Row with the number of reviews */}
        <div className="text-sm text-[#9d9d9d] pl-[13rem] ">
          {details.total_reviews} reviews
        </div>

        {/* Row with the course name */}
        <div className="pt-2">{details.course_title}</div>

        {/* Row with the terms */}
        <div className="pt-8 space-x-2">
          {details.offered_terms.map((termID) => {
            return (
              <span
                key={`${termID}${details.course_code}`}
                className="rounded-full text-sm border-4 bg-[#ccebf6] border-[#ccebf6]"
              >
                {termID}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
