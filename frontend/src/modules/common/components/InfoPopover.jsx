import { InfoCircleFill } from "react-bootstrap-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";

export const InfoPopover = ({ text }) => {
  const popover = (
    <Popover>
      <Popover.Body>{text}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 200, hide: 100 }}
      overlay={popover}
      trigger={["hover", "focus"]}
    >
      <InfoCircleFill className="ms-2" role="button" />
    </OverlayTrigger>
  );
};
