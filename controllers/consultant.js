import Consultant from "../models/consultant.js";

const getConsultants = async (req, res, next) => {
  const consultants = await Consultant.find();

  const consultantsResponse = consultants.map((consultant) => {
    const consultantObject = consultant.toObject();
    delete consultantObject.password;
    return consultantObject;
  });

  return res.status(200).json(consultantsResponse);
};

export { getConsultants };
