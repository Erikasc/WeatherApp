export class Weather {
    constructor(cityName, description, temperature, temperatureMin, temperatureMax, icon, country) {
        this.cityName = cityName;
        this.description = description;
        this.temperature = temperature;
        this.temperatureMin = temperatureMin;
        this.temperatureMax = temperatureMax;
        this.icon = icon;
        this.country = country;
    }
}
export const WEATHER_PROXY_HANDLER = {
    get: function(target, property) {
        return Reflect.get(target, property);
    },
    set: function(target, property) {
        return Reflect.set(target, property);
    }
};
