import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from '../../component/Chart/Chart';
import Information from '../../component/Information/Information';
import Select from 'react-select';
import { statisticalTurn } from '../../redux/Action/TurnAction';
import Loading from '../../component/Loading/Loading';

export default function Statistical() {
    const chartOptions = {
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
        maintainAspectRatio: true,
        aspecRatio: 2,
        responsive: true,
    };
    const exampleBarData = {
        labels: ['AUG', 'JUL', 'JUN'],
        datasets: [
            {
                label: 'Number of arrivals',
                backgroundColor: '#ffe000',
                data: [10, 20, 15],
            },
            {
                label: 'Number of unknow arrivals',
                backgroundColor: '#1BD2A4',
                data: [7, 13, 13],
            },
            {
                label: 'Number of no masked arrivals',
                backgroundColor: '#DC2425',
                data: [7, 7, 7],
            },
        ],
    };

    const dispatch = useDispatch();
    const { stats, loading } = useSelector((state) => state.turnStats);
    const [dailyStats, setDailyStats] = useState(null);
    const [monthlyStats, setMonthlyStats] = useState(null);
    const [selected, setSelected] = useState({ value: 'daily', label: 'Daily' });
    const [barData, setBarData] = useState(exampleBarData);
    const [currentStats, setCurrentStats] = useState(null);
    const [dataNumber, setDataNumber] = useState({
        total: 0,
        unknown: 0,
        noMasked: 0,
    });

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    useEffect(() => {
        dispatch(statisticalTurn());
    }, [dispatch]);

    useEffect(() => {
        if (stats) {
            console.log(stats, selected.value);
            const calBar = (name) => {
                return stats[selected.value].data.labels.map((label) => {
                    const obj = stats[selected.value].data[name].find((el) => el._id === label);
                    return obj ? obj.numTurnStats : 0;
                });
            };
            setBarData({
                labels: stats[selected.value].data.labels,
                datasets: [
                    {
                        label: 'Number of arrivals',
                        backgroundColor: '#ffe000',
                        data: calBar('total'),
                    },
                    {
                        label: 'Number of unknow arrivals',
                        backgroundColor: '#1BD2A4',
                        data: calBar('unknown'),
                    },
                    {
                        label: 'Number of no masked arrivals',
                        backgroundColor: '#DC2425',
                        data: calBar('noMasked'),
                    },
                ],
            });
            setDataNumber({
                total: calBar('total')[2],
                unknown: calBar('unknown')[2],
                noMasked: calBar('noMasked')[2],
            });
            console.log(dataNumber);
        }
    }, [selected, stats]);
    const options = [
        { value: 'daily', label: 'Daily' },
        { value: 'monthly', label: 'Monthly' },
    ];

    return (
        <>
            <h1 className="font-normal text-[36px] mb-[10px]">Statistical</h1>
            {loading ? (
                <div className="rounded-xl shadow-3xl px-[40px] bg-white py-[40px] h-[90%]">
                    <Select
                        options={options}
                        className="w-80"
                        defaultValue={selected}
                        onChange={handleChange}
                    />
                    <div className="mt-[20px]">
                        <p className=" text-[20px] mb-[10px]">
                            Statistics of the number of arrivals of{' '}
                            {selected.value === 'daily' ? 'today' : 'this month'}
                        </p>
                        <div className="grid grid-cols-3">
                            <Information
                                text="Total number of arrivals"
                                number={dataNumber.total}
                                className="bg-[#ffe000]"
                            />
                            <Information
                                text="Total number of unknow arrivals"
                                number={dataNumber.unknown}
                                total={dataNumber.total}
                                className="bg-[#1BD2A4]"
                            />
                            <Information
                                text="Total number of no masked arrivals"
                                number={dataNumber.noMasked}
                                total={dataNumber.total}
                                className="bg-[#DC2425]"
                            />
                        </div>
                        <div className="w-full mt-[20px]">
                            <p className=" text-[20px] mb-[10px]">
                                Statistics of the number of arrivals in the last 3{' '}
                                {selected.value === 'daily' ? 'days' : 'months'}
                            </p>
                            <Chart type="barChart" data={barData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            ) : (
                <Loading></Loading>
            )}
        </>
    );
}
