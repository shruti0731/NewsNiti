import React from "react";

function Card(props) {
  return (
    <div className="everything-card mt-10 shadow-lg rounded-lg overflow-hidden bg-white flex flex-col justify-between h-full">
      {/* Card content */}
      <div className="flex-grow p-5">
        {/* Title */}
        <b className="title text-xl font-semibold mb-2">{props.title}</b>

        {/* Image */}
        <div className="everything-card-img mx-auto">
          <img
            className="everything-card-img w-full rounded-md object-cover"
            src={props.imgUrl}
            alt="img"
          />
        </div>

        {/* Description with limited height and ellipsis */}
        <div className="description mt-4">
          <p className="description-text text-gray-700 line-clamp-3 overflow-hidden">
            {props.description?.substring(0, 200)}
          </p>
        </div>

        {/* Info */}
        <div className="info mt-4">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-words"
            >
              {props.source.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col mt-2">
            
            <p className="origin-item">
              <span className="font-semibold">Published At:</span> {props.publishedAt}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons aligned at the bottom */}
      <div className="p-5">
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Summarize News
          </button>
          <button className="flex-1 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
            Add to Notes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
