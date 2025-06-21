export async function parseTrainingData(trainingData = []) {
  return new Promise((resolve, reject) => {
    try {
      function getSumOfObj(trainingData = [], zoneKey) {
        return trainingData
          .filter((e) => e.zone === zoneKey)
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue.duration,
            0,
          );
      }

      const sum = trainingData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.duration,
        0,
      );

      resolve({
        totalDuration: sum,
        totalZ1: getSumOfObj(trainingData, 1),
        totalZ2: getSumOfObj(trainingData, 2),
        totalZ3: getSumOfObj(trainingData, 3),
        totalZ4: getSumOfObj(trainingData, 4),
        totalZ5: getSumOfObj(trainingData, 5),
      });
    } catch (error) {
      reject(error);
    }
  });
}
