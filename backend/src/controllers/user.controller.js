import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password, phoneNumber, role } = req.body;
    if (
      !fullname ||
      !email ||
      !username ||
      !password ||
      !role ||
      !phoneNumber
    ) {
      return res.status(400).json({
        message: "SOMETHING IS MISSING.",
        success: false,
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "FILE IS REQUIRED.",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    if (!cloudResponse) {
      return res.status(500).json({
        message: "CLOUDINARY UPLOAD FAILED.",
        success: false,
      });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        message: "USER ALREADY EXIST WITH THIS EMAIL.",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      return res.status(500).json({
        message: "PASSWORD HASHING FAILED.",
        success: false,
      });
    }

    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    if (!newUser) {
      return res.status(500).json({
        message: "USER CREATION FAILED.",
        success: false,
      });
    }

    return res.status(201).json({
      message: "ACCOUNT CREATED SUCCESSFULLY",
      success: true,
    });
  } catch (error) {
    console.log(error, "REGISTER USER ERROR");
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR.",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!email || !username || !password || !role) {
      return res.status(400).json({
        message: "LOGIN FIELDS ARE REQUIRED.",
        success: false,
      });
    }

    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(400).json({
        message: "INCORRECT EMAIL,PASSWORD and USERNAME",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "INCORRECT EMAIL,PASSWORD OR USERNAME",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "ACCOUNT DOESN'T EXIST WITH CURRENT ROLE",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    // const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
    const token = await jwt.sign(tokenData, "secrete_key", {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error, "LOGIN USER ERROR.");
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "LOGOUT SUCCESSFULL",
      success: true,
    });
  } catch (error) {
    console.log(error, "ERROR DURING LOGOUT.");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, username, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{resource_type:"image",upload_preset:"jobportal"});
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "USER NOT FOUND.",
        success: false,
      });
    }
    //updating data

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (username) user.username = username;
    if (skills) user.profile.skills = skillsArray;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // resume comes later here....
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "PROFILE UPDATED SUCCESSFULLY",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error, "ERROR DURING UPDATING PROFILE");
  }
};
