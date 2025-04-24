function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getBestOverlappingTimeSlots(data) {
  const grouped = {};

  // Group availability by day and convert times to minutes
  data.forEach(({ day, startTime, endTime }) => {
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push([timeToMinutes(startTime), timeToMinutes(endTime)]);
  });

  const result = [];

  for (const [day, ranges] of Object.entries(grouped)) {
    const timeline = [];

    ranges.forEach(([start, end]) => {
      timeline.push({ time: start, type: 'start' });
      timeline.push({ time: end, type: 'end' });
    });

    timeline.sort((a, b) =>
      a.time === b.time ? (a.type === 'start' ? -1 : 1) : a.time - b.time
    );

    let count = 0;
    let maxCount = 0;
    let currentStart = null;
    const bestSlots = [];

    for (const point of timeline) {
      if (point.type === 'start') {
        count++;
        if (count > maxCount) {
          maxCount = count;
          currentStart = point.time;
        } else if (count === maxCount && currentStart === null) {
          currentStart = point.time;
        }
      } else {
        if (count === maxCount && currentStart !== null) {
          bestSlots.push({ start: currentStart, end: point.time, count });
          currentStart = null;
        }
        count--;
      }
    }

    // Find the longest slot among best slots
    const bestSlot = bestSlots
      .filter((slot) => slot.count === maxCount)
      .reduce((longest, slot) => {
        const length = slot.end - slot.start;
        const maxLength = longest ? longest.end - longest.start : 0;
        return length > maxLength ? slot : longest;
      }, null);

    if (bestSlot) {
      result.push({
        day,
        start: minutesToTime(bestSlot.start),
        end: minutesToTime(bestSlot.end),
        count: bestSlot.count,
      });
    }
  }

  return result;
}

export { getBestOverlappingTimeSlots };





// function timeToMinutes(time) {
//     const [h, m] = time.split(':').map(Number);
//     return h * 60 + m;
//   }
  
//   function minutesToTime(minutes) {
//     const h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
//   }
  
//   function getBestOverlappingTimeSlots(data) {
//     const grouped = {};
  
//     // Group availability by day and convert times to minutes
//     data.forEach(({ day, startTime, endTime }) => {
//       if (!grouped[day]) grouped[day] = [];
//       grouped[day].push([timeToMinutes(startTime), timeToMinutes(endTime)]);
//     });
  
//     const result = [];
  
//     for (const [day, ranges] of Object.entries(grouped)) {
//       const timeline = [];
  
//       ranges.forEach(([start, end]) => {
//         timeline.push({ time: start, type: 'start' });
//         timeline.push({ time: end, type: 'end' });
//       });
  
//       // Sort timeline by time (start before end if equal)
//       timeline.sort((a, b) =>
//         a.time === b.time ? (a.type === 'start' ? -1 : 1) : a.time - b.time
//       );
  
//       let count = 0;
//       let maxCount = 0;
//       let currentStart = null;
//       const bestSlots = [];
  
//       for (const point of timeline) {
//         if (point.type === 'start') {
//           count++;
//           if (count > maxCount) {
//             maxCount = count;
//             currentStart = point.time;
//           } else if (count === maxCount && currentStart === null) {
//             currentStart = point.time;
//           }
//         } else {
//           if (count === maxCount && currentStart !== null) {
//             bestSlots.push({ start: currentStart, end: point.time, count });
//             currentStart = null;
//           }
//           count--;
//         }
//       }
  
//       const bestForDay = bestSlots
//         .filter((slot) => slot.count === maxCount)
//         .map((slot) => ({
//           day,
//           start: minutesToTime(slot.start),
//           end: minutesToTime(slot.end),
//           count: slot.count,
//         }));
  
//       result.push(...bestForDay);
//     }
  
//     return result;
//   }
  
//   export { getBestOverlappingTimeSlots };
  