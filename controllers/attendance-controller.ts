import express, { Request, Response } from "express";
import { Attendance } from "../models/attendance.model";
import { CommonErrors } from "../utils/common-errors";
import { IAttendance } from "../types/database";
import { FilterQuery } from "mongoose";

// GET /
// @TODO: add filtering
export const findAttendance = async (request: Request, response: Response) => {
  let filterQuery = request.query.filter ? JSON.parse(request.query.filter as string) : {};
  if (filterQuery.date) {
    const startDate = new Date(filterQuery.date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    filterQuery = {
      ...filterQuery,
      date: {
        $gte: startDate,
        $lt: endDate
      }
    };
  }

  try {
    const attendance = await Attendance.find(filterQuery as FilterQuery<IAttendance>);

    return response.status(200).json(attendance);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const showAttendance = async (request: Request, response: Response) => {
  const { attendanceId } = request.params;

  if (!attendanceId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const attendance = await Attendance.findById(attendanceId);

    return response.status(200).json(attendance);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createAttendance = async (
  request: Request,
  response: Response
) => {
  try {
    const attendance = new Attendance(request.body);

    const validation = attendance.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation?.message });
    }

    await attendance.save();

    return response.status(200).json(attendance);
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e });
  }
};

// PATCH /{oid}
export const updateAttendance = async (
  request: Request,
  response: Response
) => {
  const { attendanceId } = request.params;

  if (!attendanceId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await Attendance.findByIdAndUpdate(
      attendanceId,
      updatedFields
    );

    return response.status(204).send();
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteAttendance = async (
  request: Request,
  response: Response
) => {
  const { attendanceId } = request.params;

  if (!attendanceId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return response.status(404).json({ error: CommonErrors.BadRequest });
    }

    const result = await Attendance.deleteOne({ _id: attendance._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};
