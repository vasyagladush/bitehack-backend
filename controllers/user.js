import User from "../models/user.js";

const calculate = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  const university = req.body.university;
  const course = req.body.course;

  // here we provide to calculator api our results of matura or whatever and it should calculate then we send response
  // two numbers like

  return res.status(200).json({
    message: "Succesfully calculated",
    // here two numbers which should return calculator api and i should pass it to the site
  });
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (req.consultant) {
      const user = await User.findOne({
        _id: userId,
      });
      const userResponse = user.toObject();
      delete userResponse.password();
      return res.status(200).json(userResponse);
    } else {
      const accessTokenUserId = req.userId;
      if (accessTokenUserId !== userId) {
        res.status(403).json({
          message:
            "only consultants and the user itself can get the information of this user",
        });
      }
      const user = await User.findOne({
        _id: userId,
      });
      const userResponse = user.toObject();
      delete userResponse.password;
      return res.status(200).json(userResponse);
    }
  } catch (exception) {
    res.status(500).json(exception);
  }
};

export { calculate, getUser };
