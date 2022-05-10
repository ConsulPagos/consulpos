/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  postMessage(data.array.slice(data.start, data.end));

});

