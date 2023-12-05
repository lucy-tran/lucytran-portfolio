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
    { type: "LinkedIn" },
    { type: "GitHub" },
    { type: "Facebook" },
    { type: "Instagram" },
    { type: "Youtube" },
    { type: "Personal website" },
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
    { type: "BlogPostsGallery" },
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
        "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fd7504b8-26da-4c0d-87ba-7ec634da5fee", // shown on the landing page
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
            skillName: "Java",
            level: "intermediate",
          },
          {
            skillName: "React",
            level: "advanced",
          },
          {
            skillName: "React Native",
            level: "advanced",
          },
          {
            skillName: "Leadership",
            level: "intermediate",
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
          "https://placehold.co/800x600",
          "https://placehold.co/600x400",
          "https://placehold.co/500x400",
          "https://placehold.co/400x300",
          "https://placehold.co/300x200",
        ],
      }),
    },
    {
      order: 5,
      blockType: "Paragraph",
      properties: JSON.stringify({
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: [
          "https://placehold.co/800x600",
          "https://placehold.co/600x400",
          "https://placehold.co/500x400",
          "https://placehold.co/400x300",
          "https://placehold.co/300x200",
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
          "https://placehold.co/800x600",
          "https://placehold.co/600x400",
          "https://placehold.co/500x400",
          "https://placehold.co/400x300",
          "https://placehold.co/300x200",
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
      navTitle: "Past",
      title: "Background & Childhood",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [...sampleSection, ...sampleSection],
      },
    },
  });

  const page2 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 2,
      navTitle: "0",
      title: "The Start of It All",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [...sampleSection, ...sampleSection],
      },
    },
  });

  const page3 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 3,
      navTitle: "1",
      title: "Freshman Year",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [...sampleSection, ...sampleSection],
      },
    },
  });

  const page4 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 4,
      navTitle: "2",
      title: "Sophomore Year",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [...sampleSection, ...sampleSection],
      },
    },
  });

  const page5 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 5,
      navTitle: "3",
      title: "Junior Year",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [...sampleSection, ...sampleSection],
      },
    },
  });

  const page6 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 6,
      navTitle: "4",
      title: "Senior Year",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [...sampleSection, ...sampleSection],
      },
    },
  });

  const page7 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 7,
      navTitle: "Present",
      title: "After All These Years...",
      bgImage: "",
      tldr: "TL;DR: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      blocks: {
        create: [
          ...sampleSection,
          {
            order: 9,
            blockType: "SkillsTable",
            properties: JSON.stringify({
              techSkills: [
                "HTML5, CSS3, JavaScript, TypeScript, Java, Python, C#, GraphQL, React, React Native, Node.js, Jest, Next.js, Ant Design, Mongoose, ASP.NET, Retrofit",
              ],
              softSkills: [""],
            }),
          },
        ],
      },
    },
  });

  const page8 = await prisma.page.create({
    data: {
      userId: user.id,
      order: 1,
      navTitle: "Future",
      title: "'It's High Time'",
      bgImage: "",
      tldr: "",
      blocks: {
        create: [
          {
            order: 1,
            blockType: "ContactBox",
            properties: JSON.stringify({
              techSkills: [
                "HTML5, CSS3, JavaScript, TypeScript, Java, Python, C#, GraphQL, React, React Native, Node.js, Jest, Next.js, Ant Design, Mongoose, ASP.NET, Retrofit",
              ],
              softSkills: ["Communication, Leadership, Teaching"],
            }),
          },
          {
            order: 3,
            blockType: "ContactBox",
            properties: JSON.stringify({
              techSkills: [
                "HTML5, CSS3, JavaScript, TypeScript, Java, Python, C#, GraphQL, React, React Native, Node.js, Jest, Next.js, Ant Design, Mongoose, ASP.NET, Retrofit",
              ],
              softSkills: ["Communication, Leadership, Teaching"],
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
      content: {
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
