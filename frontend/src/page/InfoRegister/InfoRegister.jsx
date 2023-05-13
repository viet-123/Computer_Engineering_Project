import React, { useRef, useState, useEffect } from 'react';
import OnChangeInput from '../../component/Input/OnChangeInput';
import Button from '../../component/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { personRegister } from '../../redux/Action/personAction';
import { Link } from 'react-router-dom';
import Warning from '../../component/Warning/Warning';
import { CancelIcon } from '../../component/Icon/Icon';
import Webcam from 'react-webcam';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { snakeCase } from 'snake-case';
import { BlobServiceClient } from '@azure/storage-blob';
import Logo from '../../assets/image/logo.png';

export default function InforRegister() {
    const dispatch = useDispatch();
    const webcamRef = useRef();
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
    });
    const [img, setImg] = useState([]);
    const [step, setStep] = useState(1);
    const [timeInterval, setTimeInterval] = useState(5);
    const [showError, setShowError] = useState(false);
    let currentImg = img.length + 1;

    const personDetail = useSelector((state) => state.personRegister);
    const { person } = personDetail;

    async function uploadImage(file) {
        const containerName = 'testcontainer';
        const blobServiceClient = new BlobServiceClient(
            `https://test8afa.blob.core.windows.net/?sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiyx&se=2023-07-11T09:45:35Z&st=2023-03-11T01:45:35Z&spr=https&sig=qmX3wokMDrORBbgKPbFCR41YT3zOxVpptiiaBF7Ommw%3D`,
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(file.name);
        const blockBlobClient = blobClient.getBlockBlobClient();
        await blockBlobClient.uploadBrowserData(file, {
            blockSize: 4 * 1024 * 1024,
            concurrency: 20,
            blobHTTPHeaders: {
                blobContentType: 'image/png',
            },
            onProgress: (ev) => console.log(ev),
        });
    }

    const notify = (type, message) => {
        if (type === 'success') return toast.success(message);
        else return toast.error(message);
    };

    const getFile = (firstName, personId) => {
        img.forEach((src, index) => {
            fetch(src)
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File(
                        [blob],
                        `${snakeCase(firstName)}-${personId}-${index + 1}.png`,
                        blob,
                    );
                    uploadImage(file);
                });
        });
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const capture = (imgLength) => {
        let imgSrc = '';
        switch (imgLength) {
            case 0:
                imgSrc = webcamRef.current.getScreenshot();
                fetch(imgSrc)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], `test.png`, blob);
                        //Turn your face to the left
                        fetch('http://127.0.0.1:8000/api/uploadfile', {
                            body: file,
                            headers: {
                                'Content-Type': 'image/png',
                            },
                            method: 'POST',
                        }).then((res) => {
                            if (res.status === 200) {
                                console.log(1);
                                setImg((prevState) => {
                                    if (prevState.length < 3) {
                                        return [...prevState, imgSrc];
                                    } else return prevState;
                                });
                            } else {
                                notify('error', 'The photo is not valid, please retake it!');
                            }
                        });
                    });
                break;
            case 1:
                imgSrc = webcamRef.current.getScreenshot();
                fetch(imgSrc)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], `test.png`, blob);
                        //Turn your face to the right
                        fetch('http://127.0.0.1:8000/api/uploadfile', {
                            body: file,
                            headers: {
                                'Content-Type': 'image/png',
                            },
                            method: 'POST',
                        }).then((res) => {
                            if (res.status === 200) {
                                console.log(2);
                                setImg((prevState) => {
                                    if (prevState.length < 3) {
                                        return [...prevState, imgSrc];
                                    } else return prevState;
                                });
                            } else {
                                notify('error', 'The photo is not valid, please retake it!');
                            }
                        });
                    });
                break;
            case 2:
                imgSrc = webcamRef.current.getScreenshot();
                fetch(imgSrc)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], `test.png`, blob);
                        //Looking straight at the camera
                        fetch('http://127.0.0.1:8000/api/uploadfile', {
                            body: file,
                            headers: {
                                'Content-Type': 'image/png',
                            },
                            method: 'POST',
                        }).then((res) => {
                            if (res.status === 200) {
                                console.log(3);
                                setImg((prevState) => {
                                    if (prevState.length < 3) {
                                        return [...prevState, imgSrc];
                                    } else return prevState;
                                });
                            } else {
                                notify('error', 'The photo is not valid, please retake it!');
                            }
                        });
                    });
                break;
            default:
            // code block
        }
    };

    const validateInput = (name) => {
        if (!input[name] && showError)
            return (
                <Warning
                    text="Please enter a value"
                    icon={<CancelIcon />}
                    bgColor="bg-[#fff9fa]"
                    textColor="text-[#222]"
                    borColor="border-minus-red"
                />
            );
    };

    const nextStep = () => {
        if (!input.firstName || !input.lastName) setShowError(true);
        else {
            dispatch(personRegister(input.firstName, input.lastName));
        }
        setStep(2);
    };

    useEffect(() => {
        if (person) setStep(2);
    }, [person]);

    const completeRegister = () => {
        getFile(input.firstName, person.data.data._id);
        notify('success', 'Register identity information successfully!');
        setInput({ firstName: '', lastName: '' });
        setTimeInterval(5);
        setShowError(false);
        setImg([]);
        setStep(1);
    };

    useEffect(() => {
        if (step === 2 && img.length < 3) {
            var interval = setInterval(() => {
                setTimeInterval((prevTime) => {
                    if (prevTime === 1) {
                        capture(img.length);
                        return 5;
                    } else return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            setTimeInterval(5);
            clearInterval(interval);
        };
    }, [step, img]);

    if (step === 1)
        return (
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-5/12 mx-auto bg-[#f6f6f6] rounded w-full ">
                <div className="md:px-[90px] px-[10px] pb-[40px] pt-[30px] flex justify-center w-full flex-col">
                    <div className="mb-[32px] text-center items-center">
                        <div className="flex justify-center">
                            <img src={Logo} width="200" alt="" />
                        </div>
                        <h1 className="font-bold text-[28px] text-[#16192c]">
                            Register identity information
                        </h1>
                        <p className="mt-[8px] text-[#525f7f]">It's free and easy</p>
                    </div>

                    <OnChangeInput
                        type="text"
                        label="First Name"
                        placeholder="Type your First Name"
                        name="firstName"
                        onChange={handleOnChange}
                        value={input.firstName}
                    />
                    {validateInput('firstName')}
                    <OnChangeInput
                        type="text"
                        label="Last Name"
                        placeholder="Type your Last Name"
                        name="lastName"
                        onChange={handleOnChange}
                        value={input.lastName}
                    />
                    {validateInput('lastName')}

                    <Button
                        onClick={nextStep}
                        bgColor="bg-[#5c60f5]"
                        tColor="text-white"
                        title="Next step"
                    />
                    <div className="my-[24px]">
                        <span>Are you a user? </span>
                        <Link to="/" className="text-[#ff8c00] font-medium ">
                            Login
                        </Link>
                    </div>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        );
    else {
        return (
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:w-5/12 mx-auto bg-[#f6f6f6] rounded w-full ">
                <div className="md:px-[90px] px-[10px] pb-[40px] pt-[30px] flex justify-center w-full flex-col">
                    <div className="mb-[16px] text-center items-center">
                        <h1 className="font-bold text-[28px] text-[#16192c]">
                            Register user information
                        </h1>
                    </div>
                    <Webcam ref={webcamRef} />

                    {img.length < 3 ? (
                        <p className="mt-[8px] text-[18px] text-center">
                            Take a photo in {timeInterval} seconds
                        </p>
                    ) : (
                        <></>
                    )}

                    <p className="mt-[8px] text-[#525f7f] text-[20px] text-center">
                        {img.length === 0
                            ? 'Please turn your face to the left!'
                            : img.length === 1
                            ? 'Please turn your face to the right!'
                            : img.length === 2
                            ? 'Please looking straight at the camera!'
                            : ''}
                    </p>
                    <p className="mt-[8px] text-[18px] text-center">Taken {img.length} / 3</p>

                    <div className="flex w-full mt-[8px]">
                        {img.map((imgSrc, index) => {
                            return (
                                <div key={index} className="w-1/3 p-[2px]">
                                    <img src={imgSrc} alt="" />
                                </div>
                            );
                        })}
                    </div>

                    <Button
                        onClick={() => {
                            setImg([]);
                            setTimeInterval(5);
                        }}
                        bgColor="bg-[#565e64]"
                        tColor="text-white"
                        cName="mt-[12px]"
                        title="Capture image again"
                    />

                    {img.length >= 3 ? (
                        <Button
                            onClick={completeRegister}
                            bgColor="bg-[#5c60f5]"
                            tColor="text-white"
                            cName="mt-[12px]"
                            title="Register"
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <ToastContainer autoClose={3000} />
            </div>
        );
    }
}
