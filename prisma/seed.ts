import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { text } from "node:stream/consumers";

const prisma = new PrismaClient();

async function seed() {
  const email = "ltran2@macalester.edu";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("fakepassword", 10);

  let skills: Prisma.SkillCreateInput[] = [
    {
      skillName: "HTML5",
      type: "tech skill",
    },
    {
      skillName: "CSS3",
      type: "tech skill",
    },
    {
      skillName: "Python",
      type: "tech skill",
    },
    {
      skillName: "Node.js",
      type: "tech skill",
    },
    {
      skillName: "JavaScript",
      type: "tech skill", // tech skill’ or ‘soft skill’},
    },
    {
      skillName: "React",
      type: "tech skill", // tech skill’ or ‘soft skill’},
    },
    {
      skillName: "Java",
      type: "tech skill", // tech skill’ or ‘soft skill’},
    },
    {
      skillName: "React Native",
      type: "tech skill", // tech skill’ or ‘soft skill’},
    },
    {
      skillName: "Communication",
      type: "soft skill", // tech skill’ or ‘soft skill’},
    },
    {
      skillName: "Leadership",
      type: "soft skill", // tech skill’ or ‘soft skill’},
    },
    {
      skillName: "Teaching",
      type: "soft skill", // tech skill’ or ‘soft skill’},
    },
  ];

  await Promise.all(
    skills.map(async (skill) => {
      await prisma.skill.create({
        data: skill,
      });
    }),
  );

  let websiteTypes: Prisma.WebsiteCreateInput[] = [
    {
      type: "LinkedIn",
      logoUrl: "https://img.icons8.com/ios/100/linkedin.png",
    },
    {
      type: "GitHub",
      logoUrl: "https://img.icons8.com/ios/100/github--v1.png",
    },
    {
      type: "Facebook",
      logoUrl: "https://img.icons8.com/ios/100/facebook--v1.png",
    },
    {
      type: "Instagram",
      logoUrl: "https://img.icons8.com/windows/96/instagram-new.png",
    },
    {
      type: "Youtube",
      logoUrl: "https://img.icons8.com/windows/96/youtube-play.png",
    },
    {
      type: "Personal website",
      logoUrl: "https://img.icons8.com/ios-glyphs/90/domain.png",
    },
  ];

  await Promise.all(
    websiteTypes.map(async (website) => {
      await prisma.website.create({
        data: website,
      });
    }),
  );

  let blockTypes: Prisma.BlockTypeCreateInput[] = [
    { type: "H1" },
    { type: "H2" },
    { type: "H3" },
    { type: "Text" },
    { type: "BulletedList" },
    { type: "NumberedList" },
    { type: "Toggle" },
    { type: "Paragraph" },
    { type: "SkillsTable" },
    { type: "ContactBox" },
    { type: "BlogPostGallery" },
  ];

  await Promise.all(
    blockTypes.map(async (blockType) => {
      await prisma.blockType.create({
        data: blockType,
      });
    }),
  );

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      name: "lucy-tran",
      firstName: "Lucy",
      lastName: "Tran",
      profilePic:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/6854c943-a7e5-4b08-809e-eb5daed86d5b", // shown on the landing page
      bio: "Hi, I’m Lucy Tran, a developer, a learner, and a multipotentialite!",
      intro:
        "This is not just my portfolio. What you’re about to step through is my “self growth ladder,” where I will tell you a story of my personal growth, my background, how I got to where I am, and next steps.\n\nThrough this journey, I hope you’ll get a more complete sense of who I am as a person, and that I can break your impression of me as a stranger :)\n\nIf you want to skip through the ladder though, there is a TL; DR section on top of each page. But hey, if you’re not in a rush, I bet you’d love the end if you don’t skip!",
      skills: {
        create: [
          {
            skillName: "JavaScript",
            level: "advanced",
          },
          {
            skillName: "HTML5",
            level: "intermediate",
          },
          {
            skillName: "CSS3",
            level: "intermediate",
          },
          {
            skillName: "Python",
            level: "intermediate",
          },
          {
            skillName: "Java",
            level: "intermediate",
          },
          {
            skillName: "React",
            level: "advanced",
          },
          {
            skillName: "Node.js",
            level: "advanced",
          },
          {
            skillName: "React Native",
            level: "advanced",
          },
          {
            skillName: "Leadership",
          },
          {
            skillName: "Communication",
          },
          {
            skillName: "Teaching",
          },
        ],
      },
      websites: {
        create: [
          {
            userWebsiteType: "LinkedIn",
            url: "linkedin.com/in/lucytran13",
          },
          {
            userWebsiteType: "GitHub",
            url: "github.com/lucy-tran",
          },
          {
            userWebsiteType: "Facebook",
            url: "github.com/lucy-tran",
          },
          {
            userWebsiteType: "Instagram",
            url: "github.com/lucy-tran",
          },
          {
            userWebsiteType: "Youtube",
            url: "github.com/lucy-tran",
          },
        ],
      },
    },
  });

  const sampleSection = [
    {
      order: 1,
      blockType: "Text",
      properties: JSON.stringify({
        text: "Page 1 intro ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      }),
    },
    {
      order: 2,
      blockType: "H1",
      properties: JSON.stringify({
        text: "Section 1 Title",
        align: "center",
      }),
    },
    {
      order: 3,
      blockType: "Text",
      properties: JSON.stringify({
        text: "Section 1 intro ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      }),
    },
    {
      order: 4,
      blockType: "Paragraph",
      properties: JSON.stringify({
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: [
          "https://picsum.photos/800/600",
          "https://picsum.photos/600/400",
          "https://picsum.photos/500/400",
          "https://picsum.photos/400/300",
          "https://picsum.photos/300/200",
        ],
      }),
    },
    {
      order: 5,
      blockType: "Paragraph",
      properties: JSON.stringify({
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: [
          "https://picsum.photos/800/600",
          "https://picsum.photos/600/400",
          "https://picsum.photos/500/400",
          "https://picsum.photos/400/300",
          "https://picsum.photos/300/200",
        ],
      }),
    },
    {
      order: 6,
      blockType: "Paragraph",
      properties: JSON.stringify({
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: [
          "https://picsum.photos/800/600",
          "https://picsum.photos/600/400",
          "https://picsum.photos/500/400",
          "https://picsum.photos/400/300",
          "https://picsum.photos/300/200",
        ],
      }),
    },
    {
      order: 7,
      blockType: "Text",
      properties: JSON.stringify({
        text: "Section 1 ending ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      }),
    },
    {
      order: 8,
      blockType: "Text",
      properties: JSON.stringify({
        text: "", // empty string for line spacing
      }),
    },
  ];

  const page1 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 1,
      title: "Past",
      heroTitle: "Background & Childhood",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "",
      blocks: {
        create: [...sampleSection],
      },
    },
  });

  const page2 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 2,
      title: "0",
      heroTitle: "The Start of It All",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "",
      blocks: {
        create: [...sampleSection],
      },
    },
  });

  const page3 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 3,
      title: "1",
      heroTitle: "Freshman Year",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "",
      blocks: {
        create: [...sampleSection],
      },
    },
  });

  const page4 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 4,
      title: "2",
      heroTitle: "Sophomore Year",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "",
      blocks: {
        create: [...sampleSection],
      },
    },
  });

  const page5 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 5,
      title: "3",
      heroTitle: "Junior Year",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "",
      blocks: {
        create: [...sampleSection],
      },
    },
  });

  const page6 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 6,
      title: "4",
      heroTitle: "Senior Year",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "",
      blocks: {
        create: [...sampleSection],
      },
    },
  });

  const page7 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 7,
      title: "Present",
      heroTitle: "After All These Years...",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e",
      tldr: "TL;DR: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      blocks: {
        create: [
          ...sampleSection,
          {
            order: 9,
            blockType: "SkillsTable",
            properties: JSON.stringify({
              techSkills: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "TypeScript",
                "Java",
                "Python",
                "C#",
                "GraphQL",
                "React",
                "React Native",
                " Node.js",
                "Jest",
              ],
              softSkills: ["Communication", "Leadership", "Teaching"],
            }),
          },
        ],
      },
    },
  });

  const page8 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 8,
      title: "Future",
      heroTitle: "'It's High Time'",
      bgImage:
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/5376ac75-6eb8-4ddf-a3a5-3ee9a96fa603",
      tldr: "",
      blocks: {
        create: [
          {
            order: 1,
            blockType: "ContactBox",
            properties: JSON.stringify({
              headline: "Let's connect!", // sth like ‘Contact me’ or ‘Let’s connect’
              image:
                "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/32f2e283-0610-4198-92d4-ee3b1fba8c10",
              websites: ["LinkedIn", "GitHub"], // a stringified json array of UserWebsite ids
              phone: "123.456.7891",
              hasEmailForm: true, // defaut = True
            }),
          },
          {
            order: 3,
            blockType: "BlogPostGallery",
            properties: JSON.stringify({
              rssUrl: "https://medium.com/feed/@Sabesan96",
            }),
          },
        ],
      },
    },
  });

  const textWithEmbeddedLink = [
    {
      order: 1,
      blockType: "Text",
      pageId: page8.id,
      properties: JSON.stringify({
        text: "Meanwhile, you can check out my blog posts below, or chat with my ",
      }),
    },
    {
      order: 2,
      blockType: "Text",
      pageId: page8.id,
      properties: JSON.stringify({
        text: "personal AI assistant",
        url: "https://placehold.co/800x600",
      }),
    },
    {
      order: 3,
      blockType: "Text",
      pageId: page8.id,
      properties: JSON.stringify({
        text: " - who knows quite well about me!",
      }),
    },
  ];

  await prisma.block.create({
    data: {
      pageId: page8.id,
      order: 2,
      blockType: "Text",
      children: {
        create: textWithEmbeddedLink,
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
