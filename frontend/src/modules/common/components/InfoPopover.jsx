import { InfoCircleFill } from "react-bootstrap-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";

export const InfoPopover = ({ title = "", text }) => {
  const popover = (
    <Popover>
      {title && (
        <Popover.Header as="h3" className="text-dark">
          {title}
        </Popover.Header>
      )}
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
      <InfoCircleFill
        className="ms-2"
        role="button"
        tabIndex={0}
        aria-label="More information"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.currentTarget.click();
          }
        }}
      />
    </OverlayTrigger>
  );
};
