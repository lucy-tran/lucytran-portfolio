import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  Outlet,
  Link,
  NavLink,
  useFetcher,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

import { getUserByUsername } from "~/models/user.server";
import { getUserSkillByUserIdAndSkill } from "~/models/skill.server";
import {
  getPageByUserIdAndTitle,
  getFirstLevelBlocksByPageId,
  getPageTitlesByUserId,
  getChildBlocksByBlockId,
} from "~/models/page.server";

import Footer from "~/components/Footer";
import HorizontalNavBar from "~/components/HorizontalNavBar";
import Text from "../../components/Text";
import ContactBox from "../../components/ContactBox";
import Paragraph from "../../components/Paragraph";
import SkillsTable from "../../components/SkillsTable";
import BlogPostGallery from "~/components/BlogPostGallery";

import {
  processParentBlock,
  processSkillsTableBlock,
  processContactBoxBlock,
  processBlogPostGalleryBlock,
} from "./utils";

async function loadPageBlocks(userId: number, pageId: number) {
  let blocks = await getFirstLevelBlocksByPageId(pageId);
  for (let block of blocks) {
    try {
      let blockProperties = JSON.parse(block.properties);
      if (blockProperties) {
        await processSkillsTableBlock(block, blockProperties, userId);
        await processContactBoxBlock(block, blockProperties, userId);
        await processParentBlock(block, blockProperties);
        await processBlogPostGalleryBlock(block, blockProperties);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  return blocks;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userName, "Missing userName param");
  invariant(params.pageTitle, "Missing userName param");

  const user = await getUserByUsername(params.userName);
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }

  const pageTitles = await getPageTitlesByUserId(user.id);
  invariant(pageTitles, `Cannot find user pages for user ${user.id}`);

  const currentPage = await getPageByUserIdAndTitle(user.id, params.pageTitle);
  invariant(currentPage, `Cannot find page ${params.pageTitle}`);

  const blocks = await loadPageBlocks(user.id, currentPage.id);

  return json({ user, pageTitles, currentPage, blocks });
};

export default function PortfolioPage() {
  const { user, pageTitles, currentPage, blocks } =
    useLoaderData<typeof loader>();

  const nextPageTitle =
    currentPage.order + 1 <= pageTitles.length
      ? pageTitles[currentPage.order] // this is index
      : "./"; // back to home page
  const prevPageTitle = pageTitles[currentPage.order - 2];

  return (
    <div className="w-full h-full">
      <header className="relative w-full h-screen">
        <HorizontalNavBar
          pageTitles={pageTitles}
          currentPage={currentPage.title}
        />
        <img
          src={
            currentPage.bgImage ??
            "https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/5376ac75-6eb8-4ddf-a3a5-3ee9a96fa603"
          }
          className="z-[-1] absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-12 w-full flex flex-col align-center justify-center gap-8">
          <div className="self-stretch text-center w-full px-4 mx-auto sm:px-6 lg:px-8 bottom-0 relative text-4xl font-serif leading-tight sm:text-5xl lg:text-6xl">
            {currentPage.heroTitle}
          </div>
          <div className="self-stretch font-light font-sans text-lg w-full px-8 mx-auto sm:px-10 lg:px-16">
            {currentPage.tldr}
          </div>
          <div className="self-stretch w-full flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="animate-bounce w-8 sm:w-10 lg:w-12 h-auto stroke-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-4 pt-4">
        {blocks.map((block, index) => {
          if (block.blockType.includes("H") || block.blockType === "Text") {
            return (
              <Text
                key={index}
                blockType={block.blockType}
                properties={block.properties}
                childrenContent={block.childrenContent}
              />
            );
          }
          if (block.blockType === "Paragraph") {
            return (
              <Paragraph
                key={index}
                order={block.order}
                properties={block.properties}
                childrenContent={block.childrenContent}
              />
            );
          }
          if (block.blockType === "SkillsTable") {
            return <SkillsTable properties={block.properties} />;
          }
          if (block.blockType === "ContactBox") {
            return <ContactBox properties={block.properties} />;
          }
          if (block.blockType === "BlogPostGallery") {
            return <BlogPostGallery properties={block.properties} />;
          }
        })}
      </main>
      <Footer prevPage={prevPageTitle} nextPage={nextPageTitle} />
    </div>
  );
}
