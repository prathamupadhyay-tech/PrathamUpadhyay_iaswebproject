import topper from "@/models/topper";
import React from "react";
import ToppersPage from "@/user/toppersPage";
import mongoose from "mongoose";
const TopperCard = ({ toppers }) => {
  
  return (
    <div>
      <ToppersPage toppers={toppers}></ToppersPage>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const { topperId } = context.query;

    const [slugName, rankandyear] = topperId.split("-rank-");

    const [rank, year] = rankandyear.split("-");

    const name = slugName.replace(/-/g, " ");
    const parsedRank = parseInt(rank, 10);
    const parsedYear = parseInt(year, 10);
    
    const toppers = await topper.findOne({
      name,
      rank: parsedRank,
      year: parsedYear,
    });

    return {
      props: { toppers: JSON.parse(JSON.stringify(toppers)) },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: { toppers: "" },
    };
  }
}
export default TopperCard;
