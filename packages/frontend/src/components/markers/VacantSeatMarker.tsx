import { FC, ReactNode } from "react";
import { CircleMarker } from "react-leaflet";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { categoryColor, colorHue } from "../../constants/colors";

type VacantSeatMarkerProps = {
  seat: Seat;
  children?: ReactNode;
};

export const VacantSeatMarker: FC<VacantSeatMarkerProps> = ({
  seat,
  children,
}) => {
  return (
    <CircleMarker
      center={[seat.lat, seat.lng]}
      radius={10}
      className={colorHue[categoryColor[seat.category]]}
    >
      {children}
    </CircleMarker>
  );
};
