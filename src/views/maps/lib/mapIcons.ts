import { Icon } from "leaflet";
// import location_blue from "../../../assets/location/location_blue.png";
import location_red from "../../../assets/react.svg";
import location_green from "../../../assets/react.svg";
import location_yellow from "../../../assets/react.svg";
import location_blue from "../../../assets/react.svg";
import device_icon from "../../../assets/react.svg";

const iconBlue = new Icon({
    iconUrl: location_blue,
    iconSize: [60, 60],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const iconBlueFocused = new Icon({
    iconUrl: location_blue,
    iconSize: [60, 60],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "vehicle-marker-focused",
});


const iconRed = new Icon({
    iconUrl: location_red,
    iconSize: [70, 70],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const iconRedFocused = new Icon({
    iconUrl: location_red,
    iconSize: [70, 70],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "vehicle-marker-focused",
});

const iconGreen = new Icon({
    iconUrl: location_green,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const iconGreenFocused = new Icon({
    iconUrl: location_green,
    iconSize: [50, 50],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "vehicle-marker-focused",
})

const iconYellow = new Icon({
    iconUrl: location_yellow,
    iconSize: [70, 70],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const iconYellowFocused = new Icon({
    iconUrl: location_yellow,
    iconSize: [70, 70],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "vehicle-marker-focused",
})

const device = new Icon({
    iconUrl: device_icon,
    iconSize: [70, 70],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const deviceFocused = new Icon({
    iconUrl: device_icon,
    iconSize: [70, 70],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    className: "vehicle-marker-focused",
})

export const mapIcons = {
    blue: iconBlue,
    blueFocused: iconBlueFocused,
    red: iconRed,
    redFocused: iconRedFocused,
    green: iconGreen,
    greenFocused: iconGreenFocused,
    yellow: iconYellow,
    yellowFocused: iconYellowFocused,
    device: device,
    deviceFocused: deviceFocused,
}