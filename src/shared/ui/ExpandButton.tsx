import { IconButton, IconButtonProps, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: (e: Event) => void;
}
export const ExpandButton = ({ isExpanded, onClick }: ExpandButtonProps) => {
  return (
    <ExpandMore
      expand={isExpanded}
      onClick={onClick as any}
      aria-expanded={isExpanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandMore>
  );
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }: any) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));
