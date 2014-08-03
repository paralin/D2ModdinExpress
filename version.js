var fallback = "2.0.2"

var result = require('execSync').exec('git describe --always --all --dirty --long').stdout.trim();

module.exports = result || fallback;
