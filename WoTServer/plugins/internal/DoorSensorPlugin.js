var resources = require('./../../resources/model');

var actuator, interval;
var model = resources.pi.sensors.DoorSensor;
var pluginName = model.name;
var localParams = {'simulate': false, 'frequency': 2000};

console.log(model)
exports.start = function (params) {
  localParams = params;
  observe(model); //#A

  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    actuator.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function observe(what) {
  Object.observe(what, function (changes) {
    console.info('Change detected by plugin for %s...', pluginName);
  });
};

function connectHardware() {
}
//#A Observe the model for the LEDs
//#B Listen for model changes, on changes call switchOnOff
//#C Change the LED state by changing the GPIO state
//#D Connect the GPIO in write (output) mode

