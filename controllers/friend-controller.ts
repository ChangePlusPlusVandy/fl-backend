import express, { Request, Response } from "express";
import { Friend } from "../models/friend.model";
import { Attendance } from "../models/attendance.model";
import { CommonErrors } from "../utils/common-errors";
import * as csv from "fast-csv";

// GET /
// @TODO: add filtering
export const findFriends = async (request: Request, response: Response) => {
  const { filter } = request.body;

  try {
    const friends = await Friend.find(filter ?? {});

    return response.status(200).json(friends);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// GET /{oid}
export const showFriend = async (request: Request, response: Response) => {
  const { friendId } = request.params;

  if (!friendId) {
    return response.status(404).json({ error: CommonErrors.NotFound });
  }

  try {
    const friend = await Friend.findById(friendId);

    return response.status(200).json(friend);
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

// POST /
export const createFriend = async (request: Request, response: Response) => {
  try {
    const friend = new Friend(request.body);

    const validation = friend.validateSync();

    if (validation) {
      return response.status(400).json({ error: validation?.message });
    }

    await friend.save();

    return response.status(200).json(friend);
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e });
  }
};

// PATCH /{oid}
export const updateFriend = async (request: Request, response: Response) => {
  const { friendId } = request.params;

  if (!friendId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const friend = await Friend.findById(friendId);

    if (!friend) {
      return response.status(404).json({ error: CommonErrors.NotFound });
    }

    const updatedFields = request.body;

    const result = await Friend.findByIdAndUpdate(friendId, updatedFields);

    return response.status(204).send();
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: e });
  }
};

// DELETE /{oid}
export const deleteFriend = async (request: Request, response: Response) => {
  const { friendId } = request.params;

  if (!friendId) {
    return response.status(400).json({ error: CommonErrors.BadRequest });
  }

  try {
    const friend = await Friend.findById(friendId);

    if (!friend) {
      return response.status(404).json({ error: CommonErrors.BadRequest });
    }

    const result = await Friend.deleteOne({ _id: friend._id });

    return response.status(204).send();
  } catch (e) {
    return response.status(500).json({ error: e });
  }
};

function translateDaysToWeekdays(inputArray: number[]) {
  const dayMap = ["Su", "M", "T", "W", "R", "F", "Sa"];

  const result = inputArray
    .map((value, index) => (value === 1 ? dayMap[index] : ""))
    .filter((day) => day !== "")
    .join(", ");

  return result;
}

function allPossibleDays(dayArray : number[], desiredMonth : number, desiredYear : number) {
  const year = desiredYear;
  const month = desiredMonth;
  let end = new Date(year, month, 0).getDate();

  const now = new Date();
  if(year === now.getFullYear() && month === now.getMonth()) {
    end = now.getDate();
  }

  let count = 0;
  for (let day = 1; day <= end; day++) {
      const currentDay = new Date(year, month, day);
      if (dayArray[currentDay.getDay()] === 1) {
          count++;
      }
  }
  
  return count;
}

function getMonthName(monthNumber : number) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  return monthNames[monthNumber];
}

export const exportData = async (request: Request, response: Response) => {
  try {
    const now = new Date();
    let desiredMonth = now.getMonth();
    let desiredYear = now.getFullYear();

    if(Object.keys(request.query).length > 0) {
      let { month, year } = request.query;
      if (typeof month != 'string' || typeof year != 'string') {
        return response.status(400).json({ error: 'Invalid input. month and year are missing or the wrong type.' });
      }
      const monthI = parseInt(month, 10);
      const yearI = parseInt(year, 10);

      if (monthI < 0 || monthI > 11) {
        return response.status(400).json({ error: 'Invalid month. Must be between 0 and 11.' });
      }
      desiredMonth = monthI;
      desiredYear = yearI;
    }

    const friends = await Friend.find();
    const csvStream = csv.format({ headers: true });

    csvStream.pipe(response);

    response.setHeader(
      "Content-disposition",
      "attachment; filename=attendance.csv"
    );
    response.set("Content-Type", "text/csv");

    csvStream.write({Name: "", Date: "", DOW: "", Time_In: "", Time_Out: "", Transportation: "", Social_Club: ""});
    csvStream.write({Name: getMonthName(desiredMonth), Date: desiredYear.toString()});

    for (const friend of friends) {
      const firstRow = {
        Name: friend.friendName,
        Date: "Schedule",
        DOW: translateDaysToWeekdays(friend.schedule),
      };
      csvStream.write({});
      csvStream.write(firstRow);
      csvStream.write({});

      let daysAttendedCorrectly = 0;
      let daysAttendedIncorrectly = 0;
      for (const attendance_id of friend.attendance) {
        const attendance = await Attendance.findById(attendance_id);

        if (attendance && attendance.date.getMonth() === desiredMonth && attendance.date.getFullYear() === desiredYear) {
          for (let i = 0; i < attendance.timeIns.length; i++) {
            if (attendance.timeIns[i] && attendance.timeOuts[i]) {
              const dataRow = {
                Name: "",
                Date: attendance.date.toLocaleDateString(),
                DOW: attendance.date.toLocaleString("en-US", { weekday: "long" as const }),
                Time_In: attendance.timeIns[i].toLocaleTimeString("en-US"),
                Time_Out: attendance.timeOuts[i].toLocaleTimeString("en-US"),
                Transportation: attendance.transportation,
                Social_Club: attendance.socialClub,
              };
              csvStream.write(dataRow);
            }
          }
          if(friend.schedule[attendance.date.getDay()] === 1) {
            daysAttendedCorrectly++;
          } else {
            daysAttendedIncorrectly++;
          }
        }
      }

      const possibleDays = allPossibleDays(friend.schedule, desiredMonth, desiredYear);
      const attendance = daysAttendedCorrectly + " of " + possibleDays;
      const statRow = {
        Date: "Attended",
        DOW: attendance,
        Time_In: "Extra Days",
        Time_Out: daysAttendedIncorrectly,
      }

      csvStream.write({});
      csvStream.write(statRow);
    }

    await new Promise((resolve) => {
      csvStream.on("finish", resolve);
      csvStream.end();
    });
  } catch (err) {
    console.error(err);
    response.status(500).send("Internal server error");
  }
};
