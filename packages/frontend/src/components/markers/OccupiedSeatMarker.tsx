import { FC, ReactNode } from "react";
import { Marker } from "react-leaflet";
import { ColorMarker } from "../../leaflet/ColorMarker";
import { Seat } from "@google-apps-script/shared/types/Seat";
import { categoryColor } from "../../constants/colors";

type OccupiedSeatMarkerProps = {
  seat: Seat;
  children?: ReactNode;
};

export const OccupiedSeatMarker: FC<OccupiedSeatMarkerProps> = ({
  seat,
  children,
}) => {
  return (
    <Marker
      position={[seat.lat, seat.lng]}
      icon={ColorMarker(categoryColor[seat.category])}
    >
      {children}
    </Marker>
  );
};
