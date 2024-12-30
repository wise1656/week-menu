/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BackButton from "./BackButton";

export const Header = ({ children }) => (
  <div
    css={css`
      display: flex;
      justify-content: space-between;
    `}
  >
    <BackButton />
    {children}
  </div>
);
