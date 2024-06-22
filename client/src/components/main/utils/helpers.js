import React from "react";

/**
 * Formats a date to a human-readable string like 'x seconds ago', 'x minutes ago', or a date.
 * @param {Date|string} date - The date to format.
 * @returns {string} The formatted date.
 */
export default function formatDate(date) {
    if (typeof (date) == "string") {
        date = new Date(date);
    }
    const now = new Date();
    const timeDiff = now - date;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));

    if (hours < 24) {
        if (minutes < 60) {
            if (seconds <= 60) {
                return `${seconds} seconds ago`;
            } else {
                return `${minutes} minutes ago`;
            }
        } else {
            return `${hours} hours ago`;
        }
    } else if (timeDiff < 31536000000) { // Less than a year
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        const options = {
            month: 'short', // Use the short month abbreviation
            day: '2-digit', // Use 2-digit format for day
        };
        return `${date.toLocaleDateString('en-US', options)} at ${formattedTime}`;
    } else {
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        const options = {
            month: 'short', // Use the short month abbreviation
            day: '2-digit', // Use 2-digit format for day
            year: 'numeric',
        };
        return `${date.toLocaleDateString('en-US', options)} at ${formattedTime}`;
    }

}

export function parseText(text) {
    const regex = /\[(.*?)\]\((https:\/\/.*?)\)/g;
    const parts = text.split(" ");

    return parts.map((part, index) => {
        if (part.match(regex)) {
            var linkName = part.split("(")[0]
            linkName = linkName.replace('[', '').replace(']', '');

            var linkUrl = part.split("(")[1];
            linkUrl = linkUrl.replace('(', '').replace(')', '');
            // eslint-disable-next-line react/jsx-key
            return <span><a key={index} href={linkUrl} target="_blank" rel="noreferrer">{linkName} </a></span>;
        } else {
            return <span key={index}>{part} </span>;
        }
    });
}