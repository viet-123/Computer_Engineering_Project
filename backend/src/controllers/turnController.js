import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Turn from '../models/turnModel.js';
import catchAsync from '../utils/catchAsync.js';
import createSendToken from '../utils/createSendToken.js';

export const getAllTurns = getAll(Turn, 'person');

export const getTurn = getOne(Turn, 'person');

export const createTurn = createOne(Turn);

export const updateTurn = updateOne(Turn);

export const deleteTurn = deleteOne(Turn);

export const statsTurn = catchAsync(async (req, res, next) => {
  const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }

  const year = req.query.year * 1;
  const month = req.query.month * 1;
  const day = req.query.day * 1;
  const type = req.query.type; // 'daily' or 'monthly'

  const currentDate = new Date(`${year}-${month}-${day}`);

  const statsTurn = (filters, group) =>
    Turn.aggregate([
      {
        $unwind: '$time',
      },
      {
        $match: {
          ...filters,
        },
      },
      {
        $group: {
          _id: group,
          numTurnStats: { $sum: 1 },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $limit: 3,
      },
    ]);

  let endDate = {};
  let startDate = {};
  let group = {};

  if (type === 'monthly') {
    endDate = new Date(`${year}-${month}-${getDays(year, month)}`);

    let startMonth = month - 2;
    let startYear = year;
    if (startMonth < 0) {
      startMonth += 12;
      startYear -= 1;
    }
    startDate = new Date(`${startYear}-${startMonth}-0`);
    group = { $month: '$time' };
  } else {
    endDate = currentDate;
    startDate = getPreviousDay(getPreviousDay(currentDate));
    group = { $dayOfMonth: '$time' };
  }

  const filtersTotal = {
    time: {
      $gte: startDate,
      $lte: endDate,
    },
  };
  const filtersUnknown = {
    time: {
      $gte: startDate,
      $lte: endDate,
    },
    person: { $eq: null },
  };
  const filtersNoMasked = {
    time: {
      $gte: startDate,
      $lte: endDate,
    },
    isMask: { $eq: true },
  };

  const [statsTotal, statsUnknown, statsNoMasked] = await Promise.all([
    statsTurn(filtersTotal, group),
    statsTurn(filtersUnknown, group),
    statsTurn(filtersNoMasked, group),
  ]);

  res.status(200).json({
    status: 'success',
    data: [statsTotal, statsUnknown, statsNoMasked],
  });
});
