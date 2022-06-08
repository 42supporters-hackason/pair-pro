import React, { HTMLAttributes, ReactNode } from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { Avatar, CardActionArea, CardContent, Typography } from "@mui/material";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: ReactNode;
  language: string[];
}

/**
 * 投稿された内容を表示するカードコンポーネント
 */
export const PostCard = ({ title, content, language, ...props }: Props) => {
  return (
    <Container {...props}>
      <Card>
        <CardActionArea>
          <CardContent>
            <TopLayout>
              <Avatar>YT</Avatar>
              <Typography variant="h6">{title}</Typography>
            </TopLayout>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

const Container = styled.div``;

const TopLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
