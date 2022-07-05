import LogoutIcon from "@mui/icons-material/Logout";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Avatar, Box, TextareaAutosize, Typography } from "@mui/material";
import { IconButton } from "../../components/IconButton";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";

/**
 * p2p相手とやり取りをするページ
 */
export const ChatPage = () => {
  /**
   * misc.
   */
  const [volumeOn, setVolumeOn] = useBoolean(false);
  const [videoOn, setVideoOn] = useBoolean(false);
  const { goToHome } = useClientRoute();

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 68.5px)" }}>
      <Box sx={{ width: "70%", mx: 3, mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", height: "85%", width: "100%", gap: 3 }}>
            <Box sx={{ width: "50%", border: 1 }}>自分</Box>
            <Box sx={{ width: "50%", border: 1 }}>相手</Box>
          </Box>
          <Box sx={{ m: "auto", display: "flex", gap: 2 }}>
            {volumeOn ? (
              <IconButton onClick={setVolumeOn.off}>
                <VolumeUpIcon />
              </IconButton>
            ) : (
              <IconButton onClick={setVolumeOn.on}>
                <VolumeOffIcon />
              </IconButton>
            )}
            {videoOn ? (
              <IconButton onClick={setVideoOn.off}>
                <VideocamIcon />
              </IconButton>
            ) : (
              <IconButton onClick={setVideoOn.on}>
                <VideocamOffIcon />
              </IconButton>
            )}
            <IconButton>
              <PersonalVideoIcon />
            </IconButton>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 68.5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: 1,
            borderColor: "primary.main",
            py: "30px",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar src={`https://github.com/taisei-13046.png`} />
            <Typography fontWeight="bold">taisei-13046</Typography>
          </Box>
          <IconButton sx={{ mr: 2 }} onClick={() => goToHome()}>
            <Typography fontWeight="bold" sx={{ mr: 1 }}>
              退出する
            </Typography>
            <LogoutIcon />
          </IconButton>
        </Box>
        <Box sx={{ m: "15px" }}>チャット</Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            mt: "auto",
            mb: "10px",
          }}
        >
          <TextareaAutosize
            minRows={3}
            maxRows={3}
            style={{
              width: "80%",
              borderRadius: "15px",
              resize: "none",
              padding: "15px",
            }}
          />
          <SendRoundedIcon sx={{ cursor: "pointer", mb: "10px", mt: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
};
