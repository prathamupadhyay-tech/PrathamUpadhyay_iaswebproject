import connectDb from "@/middleware/mongoose";


import topic from "@/models/topic";

const handler = async (req, res) => {
  const { topicId } = req.query;

  try {
    const selectedTopic = await topic.findById(topicId).populate("subTopic");

    if (!selectedTopic) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const subTopics = selectedTopic.subTopic;

    const response = subTopics.map((subTopic) => ({
      _id: subTopic._id,
      name: subTopic.name,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default connectDb(handler);
