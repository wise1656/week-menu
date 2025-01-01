import { useRef, useState } from "react";
import { Popper, Box, ClickAwayListener } from "@mui/material";

interface TextWithPopoverProps {
  children: any;
  popup: any;
  id?: string;
}

export function TextWithPopover({ children, popup, id }: TextWithPopoverProps) {
  const [isShowIngreds, setIsShowIngreds] = useState(false);
  const anchorRef = useRef(null);
  const toggle = () => setIsShowIngreds((s) => !s);
  return (
    <>
      <span ref={anchorRef} onClick={toggle}>
        {children}
      </span>
      <ClickAwayListener
        onClickAway={(e) => {
          if (e.target != anchorRef.current) toggle();
        }}
      >
        <Popper id={id} open={isShowIngreds} anchorEl={anchorRef.current}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            {popup}
          </Box>
        </Popper>
      </ClickAwayListener>
    </>
  );
}
