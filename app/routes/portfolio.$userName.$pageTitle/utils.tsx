import { getChildBlocksByBlockId } from "~/models/page.server";
import { getUserSkillByUserIdAndSkill } from "~/models/skill.server";
import {
  getUrlByUserIdAndWebsiteType,
  getLogoUrlByWebsiteType,
} from "~/models/website.server";
import { getUserById } from "~/models/user.server";
import axios from "axios";

export async function processSkillsTableBlock(
  block: { blockType: string; properties: string },
  blockProperties: any,
  userId: number,
) {
  if (
    block.blockType === "SkillsTableBlock" &&
    blockProperties.techSkills &&
    blockProperties.softSkills
  ) {
    // A SkillsTableBlock
    for (let i = 0; i < blockProperties.techSkills.length; i++) {
      blockProperties.techSkills[i] = await getUserSkillByUserIdAndSkill(
        userId,
        blockProperties.techSkills[i],
      );
    }
    for (let i = 0; i < blockProperties.softSkills.length; i++) {
      blockProperties.softSkills[i] = await getUserSkillByUserIdAndSkill(
        userId,
        blockProperties.softSkills[i],
      );
    }
    block.properties = JSON.stringify(blockProperties);
  }
}

export async function processParentBlock(block: any, blockProperties: any) {
  if (!blockProperties || blockProperties.text == undefined) {
    // this is a parent block
    // TODO: Need to account for nested children blocks
    let childrenBlocks = await getChildBlocksByBlockId(block.id);
    let childrenContent: any[] = [];
    childrenBlocks.forEach((childBlock) => {
      if (childBlock.properties) {
        childrenContent.push(JSON.parse(childBlock.properties));
      }
    });
    block.childrenContent = JSON.stringify(childrenContent);
  }
}

export async function processContactBoxBlock(
  block: any,
  blockProperties: any,
  userId: number,
) {
  if (blockProperties.websites) {
    for (let i = 0; i < blockProperties.websites.length; i++) {
      const userWebsiteUrl = await getUrlByUserIdAndWebsiteType(
        userId,
        blockProperties.websites[i],
      );
      const websiteLogo = await getLogoUrlByWebsiteType(
        blockProperties.websites[i],
      );
      blockProperties.websites[i] = { ...userWebsiteUrl, ...websiteLogo };
    }

    if (!blockProperties.image) {
      const user = await getUserById(userId);
      blockProperties.image =
        user?.profilePic ?? "https://picsum.photos/500/500";
    }

    block.properties = JSON.stringify(blockProperties);
  }
}

export async function processBlogPostGalleryBlock(
  block: any,
  blockProperties: any,
) {
  // let apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
  // if (blockProperties.rssUrl) {
  //   apiUrl += blockProperties.rssUrl;
  // } else if (blockProperties.mediumUsername) {
  //   apiUrl += "https://medium.com/feed/" + blockProperties.mediumUsername;
  // } else {
  //   // throw new Error("Invalid Medium rss URL or username");
  //   return;
  // }
  if (block.blockType === "BlogPostGallery") {
    try {
      const userId: { id: string } = await axios.request({
        method: "GET",
        url: "https://medium2.p.rapidapi.com/user/id_for/lucytran13",
        headers: {
          "X-RapidAPI-Key":
            "a2254f4486msh2f1b71806791765p16d307jsnf41a7ea0fdfc",
          "X-RapidAPI-Host": "medium2.p.rapidapi.com",
        },
      });
      const userInfo = await axios.request({
        method: "GET",
        url: "https://medium2.p.rapidapi.com/user/" + userId.id,
        headers: {
          "X-RapidAPI-Key":
            "a2254f4486msh2f1b71806791765p16d307jsnf41a7ea0fdfc",
          "X-RapidAPI-Host": "medium2.p.rapidapi.com",
        },
      });
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  }
  return;
}
