const Lead = require("../models/Lead");

// @desc    Get dashboard metrics
// @route   GET /api/dashboard/metrics
const getMetrics = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const leadsBySourceAgg = await Lead.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const leadsBySource = leadsBySourceAgg.map((item) => ({
      source: item._id,
      count: item.count,
    }));

    const statusDistributionAgg = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const statusDistribution = statusDistributionAgg.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    const closedCount = await Lead.countDocuments({ status: "Closed" });
    const conversionRate =
      totalLeads > 0
        ? Number(((closedCount / totalLeads) * 100).toFixed(2))
        : 0;

    res.json({
      success: true,
      data: {
        totalLeads,
        leadsBySource,
        conversionRate,
        statusDistribution,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMetrics };
