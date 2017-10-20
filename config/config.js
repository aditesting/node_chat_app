const ENV = process.env.NODE_ENV || 'development';

if(ENV === "development" || ENV === "test" ){
	var config = require("./config.json");
	var envConfig = config[ENV];

	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	})
}