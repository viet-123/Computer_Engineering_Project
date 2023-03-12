import date from 'date-and-time';
import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Turn from '../models/turnModel.js';
import catchAsync from '../utils/catchAsync.js';

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
        $limit: 3,
      },
    ]);
  let endDate = {};
  let startDate = {};
  let group = {};
  let labels = [];
  if (type === 'monthly') {
    endDate = new Date(`${year}-${month}-${getDays(year, month)}`);
    endDate.setHours(23);
    endDate.setMinutes(59);

    let startMonth = month - 2;
    let startYear = year;
    if (startMonth < 0) {
      startMonth += 12;
      startYear -= 1;
    }
    startDate = new Date(`${startYear}-${startMonth}-1`);

    let midMonth = month - 1;
    let midYear = year;
    if (midMonth < 0) {
      midMonth += 12;
      midYear -= 1;
    }
    const midDate = new Date(`${midYear}-${midMonth}-1`);

    labels = [
      date.format(startDate, 'YYYY-MM'),
      date.format(midDate, 'YYYY-MM'),
      date.format(endDate, 'YYYY-MM'),
    ];
    group = { $dateToString: { format: '%Y-%m', date: '$time' } };
  } else {
    endDate = currentDate;
    endDate.setHours(23);
    endDate.setMinutes(59);
    startDate = getPreviousDay(getPreviousDay(currentDate));
    labels = [
      date.format(startDate, 'YYYY-MM-DD'),
      date.format(getPreviousDay(currentDate), 'YYYY-MM-DD'),
      date.format(endDate, 'YYYY-MM-DD'),
    ];
    group = { $dateToString: { format: '%Y-%m-%d', date: '$time' } };
  }
  const filtersTotal = {
    time: {
      $gte: startDate,
      $lte: endDate,
    },
  };
  const filtersUnknown = {
    $and: [
      {
        time: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      { person: { $eq: null } },
    ],
  };
  const filtersNoMasked = {
    $and: [
      {
        time: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      { isMasked: { $eq: false } },
    ],
  };
  const [statsTotal, statsUnknown, statsNoMasked] = await Promise.all([
    statsTurn(filtersTotal, group),
    statsTurn(filtersUnknown, group),
    statsTurn(filtersNoMasked, group),
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      labels: labels,
      total: statsTotal,
      unknown: statsUnknown,
      noMasked: statsNoMasked,
    },
  });
});
