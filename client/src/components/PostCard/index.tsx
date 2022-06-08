import React, { HTMLAttributes, ReactChild, ReactNode } from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
import { Avatar, CardActionArea, CardContent, Typography } from "@mui/material";

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialName: string;
  title: string;
  content: string;
  language: string[];
}

/**
 * 投稿された内容を表示するカードコンポーネント
 */
export const PostCard = ({
  initialName,
  title,
  content,
  language,
  ...props
}: Props) => {
  return (
    <Container {...props}>
      <Card>
        <CardActionArea>
          <CardContent>
            <CardContainer>
              <TopLayout>
                <Avatar>{initialName}</Avatar>
                <Typography variant="h6">{title}</Typography>
              </TopLayout>
              <ContentContainer>
                <Typography variant="subtitle1">{content}</Typography>
              </ContentContainer>
            </CardContainer>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

const Container = styled.div``;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  margin: 15px;
`;

const TopLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
