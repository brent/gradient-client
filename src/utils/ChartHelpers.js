const number = (x) => {
  return x === null ? NaN : +x;
}

const mean = (values, valueof) => {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
}

// Function to compute density
const kernelDensityEstimator = (kernel, X) => {
  return function(V) {
    return X.map(function(x) {
      return [x, mean(V, v => { return kernel(x - v) })];
    });
  };
}

// different kernels produce different curves
const kernelEpanechnikov = (k) => {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}

const kernelUniform = (k) => {
  return function(v) {
    if (v / k > 1.0 || v / k < -1.0) {
      return 0;
    }
    return 0.5;
  }
}

const getDensityValues = (data) => {
  //const kernel = kernelUniform;
  const kernel = kernelEpanechnikov;
  const ticks = [10,20,30,40,50,60,70,80,90,100]; 

  const kde = kernelDensityEstimator(kernel(3), ticks)
  const density =  kde(data.map(function(d){  return d; }))

  return density;
}

export {
  getDensityValues,
}
