import {
  Avatar as MuiAvatar,
  Box,
  colors,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { Badge } from "../Badge/Badge";
import { isValidPhoneNumber } from "libphonenumber-js";
import Phone from "@mui/icons-material/Phone";

interface Props {
  label: string;
  avatar?: string | ReactElement;
  status?: {
    label: string;
    color: string;
  };
  count?: number;
}

export const Avatar = ({ label, avatar, status, count }: Props) => {
  return (
    <Box position={"relative"}>
      <Tooltip title={label} placement="left">
        <MuiAvatar
          src={typeof avatar === "string" ? avatar : "/"}
          alt={label}
          sx={{
            width: 40,
            height: 40,
            border: "1px solid",
          }}
        >
          {isValidPhoneNumber(label, "US") && <Phone />}
        </MuiAvatar>
      </Tooltip>
      {status && (
        <Tooltip
          title={
            <Typography variant={"body2"} fontSize={10}>
              {status.label}
            </Typography>
          }
          placement="right"
        >
          <span>
            <Badge
              color={status.color}
              size="small"
              position={{
                right: true,
                bottom: true,
              }}
            />
          </span>
        </Tooltip>
      )}
      {count !== undefined && count > 0 && (
        <Badge
          color={colors.blue[700]}
          size="medium"
          position={{
            right: true,
            top: true,
          }}
          content={`${count}`}
        />
      )}
    </Box>
  );
};
