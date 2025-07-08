# webhook-repo
const eventList = document.getElementById('events');

function formatEvent(event) {
  const date = new Date(event.timestamp).toUTCString();
  if (event.action === "PUSH") {
    return `${event.author} pushed to "${event.to_branch}" on ${date}`;
  } else if (event.action === "PULL_REQUEST") {
    return `${event.author} submitted a pull request from "${event.from_branch}" to "${event.to_branch}" on ${date}`;
  } else if (event.action === "MERGE") {
    return `${event.author} merged branch "${event.from_branch}" to "${event.to_branch}" on ${date}`;
  }
  return "Unknown event";
}

async function fetchEvents() {
  const res = await fetch("http://localhost:5000/events");
  const data = await res.json();
  eventList.innerHTML = "";
  data.forEach(e => {
    const li = document.createElement("li");
    li.innerText = formatEvent(e);
    eventList.appendChild(li);
  });
}

setInterval(fetchEvents, 15000);
fetchEvents();
