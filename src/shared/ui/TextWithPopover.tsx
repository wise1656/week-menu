import { ReactNode, useRef, useState } from "react";
import { Popper, Box, ClickAwayListener } from "@mui/material";

interface TextWithPopoverProps {
  children: any;
  popup: ReactNode;
  id?: string;
}

export function TextWithPopover({ children, popup, id }: TextWithPopoverProps) {
  const [isShowIngreds, setIsShowIngreds] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const toggle = () => setIsShowIngreds((s) => !s);
  return (
    <>
      <div ref={anchorRef} onClick={toggle}>
        {children}
      </div>
      <ClickAwayListener
        onClickAway={(e) => {
          if (!anchorRef.current?.contains(e.target as any)) toggle();
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
