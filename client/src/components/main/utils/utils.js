/* eslint-disable no-unused-vars */
import axios from 'axios';


export async function fetchDataFromServer(url) {
  console.log("url is :", url);
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log({ message: error.message });
  }
}


export function formatDateDisplay(dateTime) {
  const currentDate = new Date();
  var newDateTime = "";
  newDateTime = formatQuestionMetadata(dateTime, currentDate);
  return newDateTime;
}

function formatQuestionMetadata(postDate, currentDate) {
  // Calculate the time difference in milliseconds
  if (typeof (postDate) == "string") {
    postDate = new Date(postDate);
  }
  const timeDifference = currentDate - postDate;

  // Convert milliseconds to seconds, minutes, or hours
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hours >= 24) {
    // If more than 24 hours have passed, display the full date
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: false };
    return `asked ${postDate.toLocaleDateString('en-US', options)}`;
  } else if (minutes >= 60) {
    // If more than 60 minutes have passed, display hours
    return `asked ${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes >= 1) {
    // If more than 1 minute has passed, display minutes
    return `asked ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    // If less than 1 minute has passed, display seconds
    return `asked ${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
}


export async function handleServerDown(showPageDictionary) {
}

