/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BackButton from "./BackButton";

export const Header = ({
  children,
  backUrl,
}: {
  children: any;
  backUrl?: string;
}) => (
  <div
    css={css`
      display: flex;
      justify-content: flex-start;
    `}
  >
    <BackButton backUrl={backUrl} />
    {children}
  </div>
);
