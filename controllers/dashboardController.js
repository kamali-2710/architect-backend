import User from "../models/User.js";
import Requirement from "../models/Requirement.js";

export const getDashboardStats = async (req, res) => {

  try {

    /* ================= USERS ================= */

    const totalUsers =
      await User.countDocuments();

    const totalArchitects =
      await User.countDocuments({
        role: "architect",
      });

    const totalClients =
      await User.countDocuments({
        role: "client",
      });

    /* ================= PROJECT STATUS ================= */

    const newCount =
      await Requirement.countDocuments({
        status: "NEW",
      });

    const assignedCount =
      await Requirement.countDocuments({
        status: "ASSIGNED",
      });

    const reviewCount =
      await Requirement.countDocuments({
        status: "UNDER_REVIEW",
      });

    const completedProjects =
      await Requirement.countDocuments({
        status: "COMPLETED",
      });

    const rejectedCount =
      await Requirement.countDocuments({
        status: "REJECTED",
      });

    /* ================= RECENT PROJECTS ================= */

    const recentProjects =
      await Requirement.find()
        .sort({
          createdAt: -1,
        })
        .limit(5);

    /* ================= MONTHLY PROJECTS ================= */

    const monthlyProjects = [];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    /* CURRENT YEAR */

    const currentYear =
      new Date().getFullYear();

    for (let i = 0; i < 12; i++) {

      const start =
        new Date(currentYear, i, 1);

      const end =
        new Date(currentYear, i + 1, 1);

      const count =
        await Requirement.countDocuments({
          createdAt: {
            $gte: start,
            $lt: end,
          },
        });

      monthlyProjects.push({

        name: months[i],

        value: count,

      });
    }

    /* ================= STATUS DATA ================= */

    const statusData = [

      {
        name: "NEW",
        value: newCount,
      },

      {
        name: "ASSIGNED",
        value: assignedCount,
      },

      {
        name: "UNDER_REVIEW",
        value: reviewCount,
      },

      {
        name: "COMPLETED",
        value: completedProjects,
      },

      {
        name: "REJECTED",
        value: rejectedCount,
      },

    ];

    /* ================= RESPONSE ================= */

    res.json({

      totalUsers,

      totalArchitects,

      totalClients,

      completedProjects,

      recentProjects,

      monthlyProjects,

      statusData,

    });

  }

  catch (err) {

    res.status(500).json({

      message: err.message,

    });

  }
};