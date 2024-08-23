import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import retinaIcon from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Color } from "../types/Color";
import { colorHue } from "../utils/colors";

export const ColorMarker = (color: Color = "blue") => {
  return L.icon({
    iconUrl: icon,
    iconRetinaUrl: retinaIcon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    className: colorHue[color],
  });
};
