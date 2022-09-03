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
    throw new Error("User email address is empty.");
  }

  let testAccount = await createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"ぺあぷろ！事務局" <no-reply@example.com>', // sender address
      
    to: profile.user.email, // list of receivers
    subject: "ペアプロ相手とマッチングしました！", // Subject line
    text: await generateMailContent({ post: on, opponent: matchedBy }), // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
