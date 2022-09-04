import { Post, Profile } from "@prisma/client";
import { prisma } from "../context";
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

type Params1 = {
  on: Post;
  to: Profile;
  matchedBy: Profile;
};

// postのマッチングが起きたことをto(Profile)に伝える。
// 使い方によってはdriver, navigator どちらにも通知を送れる。
export async function sendMatchingNotificationMail({
  on,
  to,
  matchedBy,
}: Params1) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: to.id,
    },
    include: {
      user: {
        include: {
          setting: true,
        },
      },
    },
  });

  if (!profile) {
    throw new Error("Passed profile does not exist");
  } else if (!profile.user.setting?.sendEmailOnMatching) {
    return;
  } else if (!profile.user.email) {
    console.error("User email address is empty.");
    return;
  }

  let transporter = createTransport({
    service: "Gmail",
    port: 456,
    secure: true,
    auth: {
      user: process.env.SMTP_SERVER,
      pass: process.env.SMTP_SERVER_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"ぺあぷろ！事務局" <no-reply@example.com>',
    to: profile.user.email,
    subject: "ペアプロ相手とマッチングしました！",
    text: await generateMailContent({ post: on, opponent: matchedBy }),
  });

  console.log("Message sent: %s", info.messageId);
}

type Param2 = {
  post: Post;
  opponent: Profile;
};

async function generateMailContent({ post, opponent }: Param2) {
  const community = await prisma.community.findUnique({
    where: {
      id: opponent.communityId,
    },
  });

  let content: string = "";
  content += opponent.name + "さんとペアプロマッチングしました！\n";
  content += "さっそく連絡を取って、ペアプロする時間を決めましょう！\n\n";

  content += "コミュニティ名：" + community?.name + "\n";
  content += "投稿タイトル：" + post.title + "\n";
  content += "投稿説明：" + post.description + "\n";
  return content;
}
