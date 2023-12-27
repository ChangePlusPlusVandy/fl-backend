import { Request, Response } from "express";
import { Report } from "../models/report.model";
import { CommonErrors } from "../utils/common-errors";

export const findReports = async (request: Request, response: Response) => {
  try {
    const { filters } = request.body;

    const reports = await Report.find(filters ?? {});

    return response.status(200).json(reports);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

export const showReport = async (request: Request, response: Response) => {
  const { reportId } = request.params;

  if (!reportId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const report = await Report.findById(reportId);

    return response.status(200).json(report);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

export const createReport = async (request: Request, response: Response) => {
  try {
    const report = new Report(request.body);

    const validation = report.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation.message });
    }

    await report.save();

    return response.status(200).json(report);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

export const updateReport = async (request: Request, response: Response) => {
  const { reportId } = request.params;

  if (!reportId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const replacement = new Report(request.body);

    const validation = replacement.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation.message });
    }

    const result = await Report.updateOne(
      {
        _id: reportId,
      },
      request.body
    );

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

export const deleteReport = async (request: Request, response: Response) => {
  const { reportId } = request.params;

  if (!reportId) {
    return response.status(400).json({ error: CommonErrors.InvalidID });
  }

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return response.status(400).json({ error: CommonErrors.NotFound });
    }

    const result = await Report.deleteOne({
      _id: report._id,
    });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
